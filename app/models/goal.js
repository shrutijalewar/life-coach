'use strict';
var _ = require('lodash'),
  Task = require('./task'),
  Mongo = require('mongodb');

function Goal(o, userId){
  this.name = o.goal;
  this.due = new Date(o.due);
  this.tags = o.tags.split(',');
  this.userId = userId;
  this.tasks = [];
}

Object.defineProperty(Goal, 'collection', {
  get: function(){return global.mongodb.collection('goals');}
});

Goal.create = function(o, userId, cb){
  var goal = new Goal(o, userId);
  Goal.collection.save(goal, cb);
};
Goal.findAllByUserId = function(userId, cb){
  Goal.collection.find({userId:userId}).toArray(cb);
};

Goal.findByGoalId = function(goalId, userId, cb){
  var _id = Mongo.ObjectID(goalId);
  Goal.collection.findOne({_id:_id, userId:userId}, function(err, obj){
    if(obj){
      cb(err, _.create(Goal.prototype, obj));
    }else{
      cb();
    }
  });
};

Goal.prototype.addTask = function(o){
  var task = new Task(o);
  this.tasks.push(task);
};

Goal.prototype.save = function(cb){
  Goal.collection.save(this, cb);
};

module.exports = Goal;

