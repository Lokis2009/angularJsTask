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
		url: '/edituser/:ediIid',
		templateUrl: 'templates/editUser.html',
		resolve: {
			user: function (Users) {
				return Users.query({
					id: ediIid
				})
			}
		},
		controller: 'EditUserCtr'
	})
});


app.factory('Users', function ($resource) {
	return $resource(URL, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true
		},
		create: {
			method: "PUT"
		}
	})
});

app.controller('HomeCtr', function ($scope, users) {
	$scope.usersData = users;
	console.log("===>", users)
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

app.controller('EditUserCtr', function ($scope, $location, user) {

	console.log('editUser: ' + user);

	$scope.user = user;

})

app.filter("yesFilter", function () {
	return function (input) {

		if (input) return '\u2713'
		else return '\u2718';
	}
});