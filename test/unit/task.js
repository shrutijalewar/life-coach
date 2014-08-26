/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Task    = require('../../app/models/task'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
   // Mongo     = require('mongodb'),
    db        = 'life-coach-test';

describe('Task', function(){
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

  describe('Task', function(){
    describe('constructor', function(){
      it('should create new task', function(done){
        var t = {name: 'buy shoes', difficulty: 'Easy', description: 'go shopping', rank: '1', isComplete: false},
        task = new Task(t);
        console.log(task);
        expect(task).to.be.instanceof(Task);
        expect(task.description).to.equal('go shopping');
        expect(task.name).to.equal('buy shoes');
        expect(task.rank).to.equal(1);
        done();
      });
    });
  });
});
