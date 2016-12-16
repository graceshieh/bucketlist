var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'partials/index.html',
			controller: 'indexController'
		})
		.when('/dashboard',{
			templateUrl: 'partials/dashboard.html',
			controller: 'dashboardController'
		})
		.when('/show/:id',{
			templateUrl: 'partials/details.html', 
			controller: 'detailsController'
		})
		.otherwise({
			redirectTo: '/'
		})
});