var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

function TasksController(){

  this.create = function(req,res){
    console.log("req.body ",req.body);
    var task = new Task(req.body);

    if(req.body.title | req.body.description == null){ 
      task.save(function(err, data){
        if(err){
          res.json(err);
        }
        else{
          res.json({data: data});
        }
      })
    }
    else{
      User.findOne({name: req.body._creator}, function(err, creator){
        if(req.body._taggedUser){
          User.findOne({name: req.body._taggedUser}, function(err, taggedUser){      
            task._taggedUser = taggedUser._id;
          })
        }
        task._creator = creator._id; 
        task.save(function(err, result){
          if(err){
            res.json(err);
          }
          else{
            console.log("successfully created");
            res.json({data:result});
          }
        })      
      })
      // UPDATE CREATOR AND TAGGED PERSON'S PENDING TASKS 
      User.update({name: req.body._creator}, {"$push": {pendingTasks: task._id}}, function(err, data){
        if(err){
          console.log("error");
        }
        else{
          console.log("successfully updated pending tasks");
        }
      })
      if(req.body._taggedUser){
        User.update({name: req.body._taggedUser}, {"$push": {pendingTasks: task._id}}, function(err, data){
          if(err){
            console.log("error");
          }
          else{
            console.log("successfully updated tagged user's pending tasks");
          }
        })
      }
    }
    
    
  };


}
module.exports = new TasksController(); 