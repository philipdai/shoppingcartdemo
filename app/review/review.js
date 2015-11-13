'use strict';
 
angular.module('review', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/review', {
			templateUrl: 'review/review.html',
			controller: 'ReviewCtrl'
	});
}])
 
.controller('ReviewCtrl', ['$scope','CommonProp',function($scope,CommonProp) {
	$scope.items = CommonProp.getItems();   
	$scope.total = CommonProp.getTotal();
}]);