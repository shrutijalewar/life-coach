'use strict';

var Goal = require('../models/goal'),
    moment = require('moment');

exports.new = function(req, res){
  res.render('goals/new');
};

exports.create = function(req, res){
  Goal.create(req.body, res.locals.user._id, function(){
    res.redirect('/goals');
  });
};

exports.index = function(req, res){
  Goal.findAllByUserId(res.locals.user._id, function(err, goals){
    res.render('goals/index', {goals:goals, moment:moment});
  });
};

exports.show = function(req, res){
  Goal.findByGoalId(req.params.goalId, res.locals.user._id, function(err, goal){
    if(goal){
      res.render('goals/show',{goal:goal});
    }else{
      res.redirect('/');
    }
  });
};
