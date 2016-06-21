'use strict';

app.controller('IntegratorsController', ['$scope', '$stateParams', '$location', '$anchorScroll', 'IntegratorsService', 'Page', 
                                         function ($scope, $stateParams, $location, $anchorScroll, IntegratorsService, Page) {
    Page.SetTitle('Integradores');
    $scope.integrators = IntegratorsService.list();
    $scope.selected = IntegratorsService.find($stateParams.id)
    var hasSelected = false;
    
    $scope.search = '';
    $scope.searchString = '';
    $scope.activeId = null;
    $scope.listActiveIndex = null;
    
    var regex;
    $scope.$watch('search', function (value) {
        //console.log('value = ' + value);
        $scope.searchString = escapeRegExp(value);
        if (value == '' && $scope.listActiveIndex > 0) {
            
        };
        regex = new RegExp('\\b' + escapeRegExp(value), 'i');
    });
                                                                                              
    $scope.filterBySearch = function(integrator) {
        if (!$scope.search) return true;
        return regex.test(integrator.name);
    };

    $scope.showDetails = function (id, listIndex) {
        $scope.activeId = id;
        $scope.listActiveIndex = listIndex;
        console.log('listActiveIndex = ' + $scope.listActiveIndex)
        $location.path('integradores/' + id);
    };
    
    $scope.refresh = function () {
        $scope.activeId = null;
        $scope.listActiveIndex = null;
        $scope.search = '';
        $scope.searchString = '';
        $location.path('integradores');
        
    }
    
    $scope.new = function () {
        console.log('new');
    };
                                             
}]);

/*
app.controller('IntegratorsDetailController', ['$scope', '$stateParams', 'IntegratorsService', function ($scope, $stateParams, IntegratorsService) {
    $scope.selected = IntegratorsService.find($stateParams.id)
}]);
*/

app.factory('IntegratorsService', function () {
    var integrators = [
        {
            id: 1,
            name: 'Integrador 1',
            description: 'Integrador jhg jkhg kjhg kjhg kjhg kjhg kjhg kjhgjhg kjhg hg .',
            contacts: [
                {
                    id: 1,
                    name: 'João',
                    email: 'joao@integrador1.com'
                },
                {
                    id: 2,
                    name: 'Maria',
                    email: 'maria@integrador1.com'
                }                
            ]
        },
        {
            id: 2,
            name: '2222222222',
            description: 'Integrador 2 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@22222222.com'
                }
            ]
        },
        {
            id: 3,
            name: 'Integrador 3 (33333)',
            description: 'Integrador (33333) .',
            contacts: [
                {
                    id: 4,
                    name: 'Jurema',
                    email: 'jurema@integrador3.com.br'
                },
                {
                    id: 5,
                    name: 'suporte',
                    email: 'suporte@integrador3.com.br'
                },
                {
                    id: 6,
                    name: 'Admin',
                    email: 'admin@integrador3.com.br'
                }
            ]
        },
        {
            id: 4,
            name: '2222222222',
            description: 'Integrador 2 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@22222222.com'
                }
            ]
        },
        {
            id: 5,
            name: '2222222222',
            description: 'Integrador 2 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@22222222.com'
                }
            ]
        },
        {
            id: 6,
            name: '2222222222',
            description: 'Integrador 2 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@22222222.com'
                }
            ]
        },
        {
            id: 7,
            name: '2222222222',
            description: 'Integrador 2 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@22222222.com'
                }
            ]
        },
        {
            id: 8,
            name: '2222222222',
            description: 'Integrador 2 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@22222222.com'
                }
            ]
        }
    ];
    
    return {
        list: function () {
            return integrators;
        },
        find: function (id) {
            return _.find(integrators, function (integrator) {
                return integrator.id == id;
            });
        }        
    }
});


function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}