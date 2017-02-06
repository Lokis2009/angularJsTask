var app = angular.module('myApp', ['ngResource', 'ngRoute'])

var URL = 'http://smartass.su:5000/api/users' // 'https://api.myjson.com/bins/lqh89'

app.config(['$routeProvider', '$locationProvider', function ($routeProvide, $locationProvider) {

	$routeProvide
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'tableCtr'
		})
		.when('/edituser/:userId', {
			templateUrl: 'templates/editUser.html',
			controller: 'editUserCtrl'
		})

	.when('/newuser', {
			templateUrl: 'templates/newUser.html',
			controller: 'newUserCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);


app.controller('tableCtr', function ($scope, UserData, UsersData, $location) {

	$scope.usersData = UsersData.query();

	$scope.editUser = function (userId) {
		$location.path('/edituser/' + userId);
	};

	$scope.createNewUser = function () {
		$location.path('/newuser/');
	};

	$scope.deleteUser = function (userId) {
		UserData.delete({
			id: userId
		})
		$scope.usersData = UsersData.query()

	}

	// filtering
	$scope.sortType = 'name';
	$scope.sortReverse = false;
	$scope.searchFilter = '';
});

app.filter("yesFilter", function () {
	return function (input) {

		if (input) return '\u2713'
		else return '\u2718';
	}
});

app.factory('UserData', function ($resource) {
	return $resource(URL + '/:id', {}, {
		get: {
			method: "GET"
		},
		delete: {
			method: "DELETE"
		},
		update: {
			method: "PUT"
		}
	})
});

app.factory('UsersData', function($resource){
	return $resource(URL, {}, {
		query: {
			method: "GET",
			isArray: true
		},
		create: {
			method: "PUT"
		}

	})
})

app.controller('editUserCtrl', function($scope, $location, $resource, $routeParams ,UserData, UsersData){
	$scope.updateUser = function(){
			UserData.update($scope.user);
			$location.path('/')
	};

	$scope.cancel = function(){
		$location.path('/')
	}

	$scope.user = UserData.get({id: $routeParams.userId});
	console.log($routeParams)
});

app.controller('newUserCtrl', function($scope, $location, $resource, UserData, UsersData){

	$scope.createNewUser = function(){
		UsersData.create($scope.user);
		$location.path('/');
	}
		$scope.cancel = function(){
		$location.path('/')
		}
	

});