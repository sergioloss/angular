'use strict';

var app = angular.module('Integra-0.1', ['ui.router', 'ngMaterial', 'ngMessages', 'ngStorage', 'ngMockE2E']);
app.run(run);


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$mdIconProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $mdIconProvider) {
        
        // $locationProvider.html5Mode(true);
        
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
            views: {
                'detail@app.integrators': {
                    templateUrl: 'views/integrators/integrators-detail.html',
                    controller: 'IntegratorsController'
                }
            }
        })
        
        .state('login', {
            url: '/login',
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
                'content@': {
                    templateUrl: 'views/authentication/authentication.html',
                    controller: 'AuthenticationController',
                    controllerAs: 'auth'
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

app.factory('Page', function ($location) {
    var title = 'Integra-0.1';
    var subtitle = '';
    
    return {
        Title: function () {
            return title;
        },
        SetTitle: function (newTitle) {
            title = newTitle;
        },
        Subtitle: function () {
            return subtitle;
        },
        SetSubtitle: function (newSubtitle) {
            subtitle = newSubtitle;
        },
        Path: function () {
            return $location.path();
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

function run($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
};

