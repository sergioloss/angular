'use strict';

var app = angular.module('masterPage01', ['ui.router', 'ngMaterial']);

app.config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', function($stateProvider, $urlRouterProvider, $mdIconProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: '/views/shared/header.html'
                },
                'menubar': {
                    templateUrl: '/views/shared/menubar.html',
                    controller: 'MenubarController',
                    controllerAS: 'ctrl'
                },
                'content': {
                    templateUrl: '/views/home/home.html'
                },
                'footer': {
                    templateUrl: '/views/shared/footer.html'
                }
            }
        })
    
        .state('app.dashboard', {
            url: 'dashboard',
            views: {
                'content@': {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'DashboardController'
                }
            }
        })

        .state('app.subscribers', {
            url: 'subscribers',
            views: {
                'content@': {
                    templateUrl: '/views/subscribers/subscribers.html',
                    controller: 'SubscribersController'
                }
            }
        })

        .state("app.subscribers.detail", {
            url: '/:id',
            views: {
                'detail@app.subscribers': {
                    templateUrl: '/views/subscribers/subscribers-detail.html',
                    controller: 'SubscribersDetailController'
                }
            }
        });
    
    $mdIconProvider.defaultIconSet('img/icons/sets/core-icons.svg', 24);
    
}]);

app.controller('DashboardController', function ($scope) {
    
});

app.controller('SubscribersController', function ($scope, SubscribersService) {
    $scope.subscribers = SubscribersService.list();
});

app.controller('SubscribersDetailController', function ($scope, $stateParams, SubscribersService) {
    $scope.selected = SubscribersService.find($stateParams.id);
});

app.factory('SubscribersService', function () {
    var subscribers = [
        {
            id: 1,
            name: 'Craig McKeachie',
            email: 'craig@test.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, repellendus facere expedita, magni cumque, voluptas vero nulla fugit enim ullam repellat earum vitae. Porro repellendus, officia quasi, alias numquam commodi.'
        },
        {
            id: 2,
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore magnam nostrum officiis dolor delectus ipsa magni error culpa, autem sit, perferendis eligendi officia quod amet perspiciatis dignissimos omnis molestias tempore.'
        }
    ];
    
    return {
        list: function () {
            return subscribers;
        },
        find: function (id) {
            return _.find(subscribers, function (subscriber) {
                return subscriber.id == id;
            });
        }
    };
});

app.filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) return;
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);
      var seperator = (!isOSX || keys.length > 2) ? '+' : '';
      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };
      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
})



