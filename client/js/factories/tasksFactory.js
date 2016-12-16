app.factory('tasksFactory', ['$http', function($http) {
  // constructor for our factory
  var tasks = [];
  
  var task = {};
  function TasksFactory(){
    var _this = this;
    

    this.create = function(newTask, callback){
      $http.post('/task', newTask).then(function(data){
        if(typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    }

  
  };
  return new TasksFactory();
}]);