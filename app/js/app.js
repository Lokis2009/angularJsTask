var app = angular.module('myApp', ['ngResource', 'ui.router'])

var URL = 'http://smartass.su:5000/api/users' // 'https://api.myjson.com/bins/lqh89'

app.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

  var edituserState = {
	name: 'editUser',
	url: '/edituser/:userId',
	templateUrl: 'templates/editUser.html'
} 

var newuserState = {
	name: 'newuser',
	url: '/newuser/',
	templateUrl: 'templates/newUser.html'
}
var homeState = {
	name: 'home',
	url: '/',
	templateUrl: 'templates/home.html'
}
  $stateProvider.state(helloState);
  $stateProvider.state(newuserState);
 $stateProvider.state(homeState);
  $stateProvider.state(edituserState);
});

/*app.config( function ($stateProvider) {

var edituser= {
	name: 'editUser',
	url: 'edituser/:userId',
	templateUrl: 'templates/editUser.html'
} 
	
	/*$routeProvide
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
		$stateProvider.state(edituser);
}); */


app.controller('tableCtr', function ($scope, UserData, UsersData, $location) {

	$scope.usersData = UsersData.query();
		// go to edit User page
	$scope.editUser = function (userId) {
		$location.path('/edituser/' + userId);
	};
		// go to edit New user create page
	$scope.createNewUser = function () {
		$location.path('/newuser/');
	};
		//delete User
	$scope.deleteUser = function (userId) {
		UserData.delete({
			id: userId
		}).$promise.then(function(responce){
			console.log(responce);
			
			$scope.usersData = UsersData.query()  //update data after delete
			
		}).catch(function(error){
			console.log(error)
		});
		

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

app.factory('UsersData', function ($resource) {
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

app.controller('editUserCtrl', function ($scope, $http, $location, $resource, $routeParams, UserData, UsersData, $q) {
	// update User Data
	$scope.updateUser = function () {
		
		UserData.update($scope.user)
			.$promise
			.then(function(){
			$location.path('/')	
		})
		.catch(function(error){
			console.log(error);
			alert('что-то пошло не так!')
		})
		
		
		
	};

	$scope.cancel = function () {
		$location.path('/')
	}
		// get this.user Data
	UserData.get({
		id: $routeParams.userId
	}).$promise.then(function(responce){
				$scope.user = responce

	}).catch(function(error){
		console.log(error);
	});
});

app.controller('newUserCtrl', function ($scope, $location, $resource, UserData, UsersData) {
		// create new User
	$scope.createNewUser = function () {
		UsersData.create($scope.user).$promise
			.then(function(){
				$location.path('/')	
		})
			.catch(function(error){
			console.log(error)
		});
		
	}
	
	$scope.cancel = function () {
		$location.path('/')
	}


});