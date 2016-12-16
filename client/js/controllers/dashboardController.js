app.controller('dashboardController', ['$scope', 'usersFactory', 'tasksFactory', function($scope, usersFactory, tasksFactory){
	$scope.loggedUser = []; 
	$scope.users = [];
	$scope.pendingTasks = []; 
	$scope.finishedTasks = [];
	$scope.errors = [];
	$scope.myPendingTasks = []; 

	var index = function(){
		usersFactory.index(function(data){
			$scope.loggedUser = data.data; 
			$scope.pendingTasks = data.data.pendingTasks;
			$scope.finishedTasks = data.data.finishedTasks;
			console.log("finished tasks", $scope.finishedTasks);
		});
		usersFactory.getUsers(function(data){
			$scope.users = data; 
		});
	}
	
	index();

	$scope.createTask = function(){
		var newTask= {
			_creator:$scope.loggedUser.name, 
			title: $scope.title, 
			description: $scope.description, 
			_taggedUser: $scope._taggedUser
		};
		tasksFactory.create(newTask, function(data){
			console.log(data);
			if(data.errors){
				$scope.errors = data.errors; 
			}
			else{
				index();
				$scope.title = '';
				$scope.description = ''; 
			}
		})
	}

	$scope.complete = function(index){
		var task = {user: $scope.loggedUser.name, taskID:$scope.pendingTasks[index]._id};
		usersFactory.complete(task, function(data){
			console.log(data);
			index();
		})
	}

}])

