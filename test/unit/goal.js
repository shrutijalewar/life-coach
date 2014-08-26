/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Goal    = require('../../app/models/goal'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'life-coach-test';

describe('Goal', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('.create', function(){
    it('should create new goal', function(done){
      var body = {goal: 'run a marathon', due: '2015-12-30', tags: 'a,b,c,d'},
      userId =Mongo.ObjectID ('000000000000000000000001');
      Goal.create(body, userId, function(err, goal){
        expect(goal).to.be.instanceof(Goal);
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.userId).to.be.instanceof(Mongo.ObjectID);
        expect(goal.due).to.be.instanceof(Date);
        expect(goal.name).to.equal('run a marathon');
        expect(goal.tags.length).to.equal(4);
        done();
      });
    });
  });
  describe('.findAllByUserId', function(){
    it('should find all goals by user id', function(done){
      var  userId =Mongo.ObjectID ('000000000000000000000001');
      Goal.findAllByUserId(userId, function(err, goals){
        expect(goals.length).to.equal(2);
        done();
      });
    });
  });
  describe('.findByGoalId', function(){
    it('should find one goal by its id', function(done){
      var  goalId ='a00000000000000000000001',
           userId = Mongo.ObjectID ('000000000000000000000001');
      Goal.findByGoalId(goalId, userId, function(err, goal){
        expect(goal).to.be.ok;
        done();
      });
    });
  });
});

