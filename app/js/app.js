var app = angular.module('myApp', ['ngResource', 'ngRoute'])

var URL = 'http://smartass.su:5000/api/users'  // 'https://api.myjson.com/bins/lqh89'

app.controller('tableCtr', function ( $scope, UserData) {

	/*
	$http.get(URL).success(function (data) {
		$scope.userData = data
	})*/
	
	$scope.userData = UserData.query();
	
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

app.factory('UserData', function($resource) {
  return $resource(URL+'/:id'); // Note the full endpoint address
});

