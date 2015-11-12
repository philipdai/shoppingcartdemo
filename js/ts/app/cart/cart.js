angular.module('cart', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: '/cart/cart.html',
            controller: 'CartCtrl'
        });
    }])
    .controller('CartCtrl', ['$scope', 'CommonProp', function ($scope, CommonProp) {
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
        $scope.$watch('shopData', function () {
            CommonProp.setItem($scope.shopData);
        });
        $scope.total = function () {
            var t = 0;
            for (var k in $scope.shopData) {
                t += parseInt($scope.shopData[k].selected) * (parseInt($scope.shopData[k].num));
            }
            CommonProp.setTotal(t);
            return t;
        };
        if (CommonProp.getItems() != '') {
            $scope.shopData = CommonProp.getItems();
        }
    }])
    .directive('checkList', function () {
    return {
        restrict: 'E',
        scope: {
            option: '=',
            name: '=',
            selected: '=selected',
            num: '='
        },
        template: function (elem, attrs) {
            return '<div class="panel-body">\
								<div class="radio" ng-repeat="i in option">\
									<label><input type="radio" ng-model="$parent.selected" ng-value="{{i.price}}"  name="{{name}}">{{i.size}} USD {{i.price}}</label>\
								</div>\
							</div>';
        }
    };
})
    .directive('getScroll', function ($window) {
    return {
        scope: {
            scroll: '=scroll'
        },
        link: function (scope, element, attrs) {
            var scrollwindow = angular.element($window);
            scrollwindow.on('scroll', scope.$apply.bind(scope, function () {
                scope.scroll = scrollwindow.scrollTop();
            }));
        }
    };
})
    .service('CommonProp', function () {
    var Items = '';
    var Total = 0;
    return {
        getItems: function () {
            return Items;
        },
        setItem: function (value) {
            Items = value;
        },
        getTotal: function () {
            return Total;
        },
        setTotal: function (value) {
            Total = value;
        }
    };
})
    .service('reset', function () {
    return {
        orig: function () {
            return [{
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
        }
    };
});

//# sourceMappingURL=cart.js.map
