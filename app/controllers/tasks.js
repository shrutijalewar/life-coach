'use strict';

var Task = require('../models/task');

exports.create = function(req, res){
  Task.create(req.body, res.locals.user._id, function(){
  });
};
