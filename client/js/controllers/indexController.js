app.controller('indexController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location){

	$scope.login = function(){
		newUser = {name: $scope.name};
		usersFactory.login(newUser, function(data){
			$location.url('/dashboard');
		})
	}

}])