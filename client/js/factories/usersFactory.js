app.factory('usersFactory', ['$http', function($http) {
  // constructor for our factory
  var loggedUser = [];
  var users = [];
  var user = {};
  function UsersFactory(){
    var _this = this;

    this.index = function(callback){
      $http.post('/loggedUser',loggedUser).then(function(data){
        loggedUser = data;
        callback(loggedUser);
      })
      
    }

    this.getUsers = function(callback){
      $http.get('/users').then(function(data){
        users = data.data; 
        callback(users);
      })
      
    }

    this.login = function(newUser,callback){
      $http.post('/user', newUser).then(function(data){
        if(typeof(callback) == 'function'){
          loggedUser = data.data;
          callback(loggedUser);
        }
      })
      
    }

    this.complete = function(task, callback){
      $http.delete('/task',task).then(function(data){
        if(typeof(callback) == 'function'){
          callback(data.data);
        }
      })
      $http.put('/task', task).then(function(data){
        if(typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    }
  
  };
  return new UsersFactory();
}]);