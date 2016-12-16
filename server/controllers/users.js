
var mongoose = require('mongoose');
var User = mongoose.model('User');

function UsersController(){

  this.create = function(req,res){
    var newUser = new User(req.body); 

    User.findOne({name:req.body.name})
      .populate('pendingTasks')
      .populate('finishedTasks')
      .exec(function(err, user){
        if(!user){
          newUser.save(function(err, result){
            if(err){
              console.log("error when saving");
              res.json(err); 
            }
            else{
              res.json({data:result});
            }
          })
        }
        else{
          res.json({data:user});
        }
      })
      
  };

  this.findLogged = function(req,res){
    console.log("find logged" ,req.body.data.name);
    User.findOne({name:req.body.data.name})
      .populate('pendingTasks')
      .populate('finishedTasks')
      .exec(function(err, users){
        if(err){
          console.log("error");
        }
        else{
          res.json(users);
        }
      })
  }

  this.find = function(req,res){
    User.find({})
      .populate('pendingTasks')
      .populate('finishedTasks')
      .exec(function(err, users){
        if(err){
          console.log("error");
        }
        else{
          res.json(users);
        }
      })
  }

  this.updateComplete = function(req,res){
    User.update({name:req.body.user}, {"$push": {finishedTasks: req.body.taskID}}, function(err, data){
      if(err){
        console.log("error");
      }
      else{
        console.log("successfully updated finishedTasks");
      }
    })
  }

  this.deleteTask = function(req,res){
    // THIS DELETE FROM PENDINGTASK LIST IS NOT WORKING... 
    User.update({name:req.body.user}, {'$pull': {pendingTasks: req.body.taskID}}, function(err, data){
      if(err){
        console.log("error");
      }
      else{
        console.log("successfully removed from pendingTasks");
      }
    })
  }

}
module.exports = new UsersController(); 