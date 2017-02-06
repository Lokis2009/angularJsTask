var app = angular.module('myApp', ['ngResource', 'ngRoute'])

var URL='https://api.myjson.com/bins/lqh89'

app.controller('tableCtr', function($http, $scope){
 
	 $http.get(URL).success(function(data){
		 $scope.userData = data
	 })
	 
	 $scope.sortType = 'name';
	$scope.sortReverse = false;
	 $scope.searchFilter   = '';
});

/*
app.factory('UserData', function($resource) {

	return $resource(URL);

});

*/

app.filter("yesFilter", function () {
	return function (input) {

		if (input) return '\u2713'
		else return '\u2718';
	}
});