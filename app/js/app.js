var app = angular.module('myApp', ['ui.router', 'ngResource']);

var URL = 'http://smartass.su:5000/api/users/:id'

app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'templates/home.html',
		resolve: {
			users: function (Users) {
				return Users.query().$promise
			}
		},
		controller: 'HomeCtr'
	})

	$stateProvider.state('newUser', {
		url: '/newUser',
		templateUrl: 'templates/newUser.html',
		controller: 'NewUserCtr'

	})

	$stateProvider.state('editUser', {
		url: '/edituser/:id',
		templateUrl: 'templates/editUser.html',
		resolve: {
			user: function (Users, $stateParams) {
				return Users.get({
					id: $stateParams.id
				})
			}
		},
		controller: 'EditUserCtr'
	})
});


app.factory('Users', function ($resource) {
	return $resource(URL, {
		id: "@id"
	}, {
		get: {
			method: 'GET'
		},
		create: {
			method: "PUT"
		},

		query: {
			method: 'GET',
			isArray: true
		},

		delete: {
			method: 'DELETE'
		},

		save: {
			method: 'POST'
		}
	})
});

app.controller('HomeCtr', function ($scope, $location, users, Users) {

	$scope.usersData = users;

	$scope.deleteUser = function (id) {
		Users.delete(id).$promise.then(function () {
				alert("Deleted!");

			})
			.catch(function (error) {
				console.log(error)
			});
	}
});

app.controller('NewUserCtr', function ($scope, Users, $location) {
	// create new User
	$scope.createNewUser = function () {

		Users.create($scope.user).$promise
			.then(function () {
				$location.path('/')
			})
			.catch(function (error) {
				console.log(error)
			});
	}
});

app.controller('EditUserCtr', function ($scope, $location, user, Users) {

	$scope.user = user;

	$scope.updateUser = function () {
		Users.save($scope.user).$promise.then(function () {
				$location.path('/')
			})
			.catch(function (error) {
				console.log(error)
			});
	}

})

app.filter("yesFilter", function () {
	return function (input) {

		if (input) return '\u2713'
		else return '\u2718';
	}
});