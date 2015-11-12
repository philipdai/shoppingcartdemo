'use strict';
 
angular.module('shoppingCart', [
	'ngRoute',
	'cart',
	'review',
	'purchase'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo: '/cart'
	});
}]);

