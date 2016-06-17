'use strict';

var app = angular.module('Integra-0.1', ['ui.router', 'ngMaterial', 'ngMessages']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$mdIconProvider',
    function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
        // default route
        $urlRouterProvider.otherwise('/');
        
        // app routes
        $stateProvider
        .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'views/shared/header.html'
                },
                'main-menu': {
                    templateUrl: 'views/shared/mainmenu.html',
                    controller: 'MainMenuController',
                    controllerAs: 'mainMenu'
                },
                'nav': {
                    templateUrl: 'views/shared/nav.html'
                },
                'content': {
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeController'
                },
                'footer': {
                    templateUrl: 'views/shared/footer.html'
                }
            }
        })
        
        .state('app.integrators', {
            url: 'integradores',
            views : {
                'content@': {
                    templateUrl: 'views/integrators/integrators.html',
                    controller: 'IntegratorsController'
                }
            }
        })
        
        .state('app.integrators.detail', {
            url: '/:id',
            views : {
                'detail@app.integrators': {
                    templateUrl: 'views/integrators/integrator-detail.html',
                    controller: 'IntegratorsController'
                }
            }
        })
        
        $mdIconProvider.defaultIconSet('img/icons/sets/core-icons.svg', 24);
        
        // ------
        
    }
]);

app.controller('mainController', ['$scope', 'Page', function ($scope, Page) {
    $scope.Page = Page;
}]);

app.factory('Page', function () {
    var title = 'Integra-0.1';
    
    return {
        Title: function () {
            return title;
        },
        SetTitle: function (newTitle) {
            title = newTitle;
        }
    };
});

app.filter('keyboardShortcut', ['$window', function ($window) {
    return function(str) {
        if (!str) return;        
        var keys = str.split('-');
        var isOSX = /Mac OS X/.test($window.navigator.userAgent);
        
        var separator = (!isOSX || keys.length > 2) ? '+' : '';
        
        var abbreviations = {
            M: isOSX ? '⌘' : 'Ctrl',
            A: isOSX ? 'Option' : 'Alt',
            S: 'Shift'
        };
        
        return keys.map(function (key, index) {
            var last = index == keys.length - 1;
            return last ? key : abbreviations[key];
        }).join(separator);        
    };
}]);