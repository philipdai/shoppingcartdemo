angular.module('purchase', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/purchase', {
			templateUrl: '/purchase/purchase.html',
			controller: 'PurchaseCtrl'
	});
}])

.controller('PurchaseCtrl', ['$scope', 'CommonProp', 'reset', function($scope, CommonProp, reset) {
	$scope.items = CommonProp.getItems();
	$scope.total = CommonProp.getTotal();

	$scope.randomString = function(length, chars) {
		var result = '';
		for (var i = length; i > 0; --i) {
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		}
		return result;
	};

	$scope.confirmNum = $scope.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

	$scope.shopData = [{
    'item': 'Hard Disk',
    'id': 'HD',
    'selected': 0,
		'num': 0,
		'description': 'Hard Disk is used to store data persistently.',
    'prices': [{
        'size': '200GB',
        'price': '200'
    }, {
        'size': '400GB',
        'price': '400'
    }]
		}, {
			'item': 'CPU',
			'id': 'CPU',
			'selected': 0,
			'num': 0,
			'description': 'CPU is used to calcuate data, and is the center controling unit of computer.',
			'prices': [{
					'size': 'i3',
					'price': '2000'
			}, {
					'size': 'i5',
					'price': '2500'
			}]
		}, {
			'item': 'Monitor',
			'id': 'MON',
			'selected': 0,
			'num': 0,
			'description': 'Monitor is used to display graphs and texts, and it is the user output interface.',
			'prices': [{
					'size': '16\'',
					'price': '300'
			}, {
					'size': '19\'',
					'price': '500'
			}]
		}, {
			'item': 'Optical Mouse',
			'id': 'MOU',
			'selected': 0,
			'num': 0,
			'description': 'Optical Mouse is used to control the curser on the screen.',
			'prices': [{
					'size': 'Optical',
					'price': '35'
			}, {
					'size': 'Advanced',
					'price': '55'
			}]
		}, {
			'item': 'RAM',
			'id': 'RM',
			'selected': 0,
			'num': 0,
			'description': 'RAM is used to store and switch data between CPU and Hard Disc instantly.',
			'prices': [{
					'size': '4GB',
					'price': '400'
			}, {
					'size': '8GB',
					'price': '800'
			}]
		}, {
			'item': 'USB Keyboard',
			'id': 'KEY',
			'selected': 0,
			'num': 0,
			'description': 'USB Keyboard is used to input user input like text and commands via USB.',
			'prices': [{
					'size': 'Standard',
					'price': '250'
			}, {
					'size': 'Advanced',
					'price': '450'
			}]
	}];

	CommonProp.setItem($scope.shopData);

}]);
