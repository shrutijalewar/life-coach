/*global describe, before, beforeEach, it*/
'use strict';
process.env.PORT = 5555;
process.env.DB = 'life-coach-test';

var expect = require('chai').expect,
    cp     =  require('child_process'),
    app    = require('../../app/index'),
    cookie = null,
    request= require('supertest');

describe ('goals',function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@bob.com')
      .send('password=nono')
      .end(function(err,res){
        cookie =res.headers['set-cookie'][0];
        //console.log(res.headers);
        done();
      });
    });
  });

  describe('get /', function(done){
    it('should fetch the home page', function(done){
      request(app)
      .get('/')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Home');
        done();
      });
    });
  });
  describe('get /goals/new', function(done){
    it('should show the new goals page', function(done){
      request(app)
      .get('/goals/new')
      .set('cookie', cookie)
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Name');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });
  describe('post /goals', function(done){
    it('should show the new goals page', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie)
      .send('goal=run+a+marathon&due=2015-12-30&tags=a%2Cb%2Cc%2Cd')
      .end(function(err,res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });
  describe('get /goals', function(done){
    it('should create a  new goal and show the goals page', function(done){
      request(app)
      .get('/goals')
      .set('cookie', cookie)
      .send('goal=run+a+marathon&due=2015-12-30&tags=a%2Cb%2Cc%2Cd')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('marathon');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });
  describe('get /goals/3', function(done){
    it('should show a specific goal page', function(done){
      request(app)
      .get('/goals/a00000000000000000000001')
      .set('cookie', cookie)
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('marathon');
        done();
      });
    });
    it('should show a specific goal page', function(done){
      request(app)
      .get('/goals/a00000000000000000000003')
      .set('cookie', cookie)
      .end(function(err,res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });
 /* describe('post /goals/3/task', function(done){
    it('should create a specific task for a goal', function(done){
      request(app)
      .post('/goals/a00000000000000000000001/task')
      .set('cookie', cookie)
      .send('name=buy+shoes&description=shop+for+it&difficulty=Medium&rank=3')
      .end(function(err,res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });*/
});
