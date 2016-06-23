'use strict';

app.controller('IntegratorsController', ['$scope', '$stateParams', '$location', '$anchorScroll', 'IntegratorsService', 'Page', 
                                         function ($scope, $stateParams, $location, $anchorScroll, IntegratorsService, Page) {
    Page.SetTitle('Integradores');
    $scope.integrators = IntegratorsService.list();
                                             
    if ($stateParams.id == 'novo') {
        $scope.selected = {};
        $scope.detailSubtitle = 'Incluir Novo Integrador';
        $scope.readOnly = false;
    } else {
        $scope.selected = IntegratorsService.find($stateParams.id);
        $scope.editIntegrator = angular.copy($scope.selected);
        $scope.detailSubtitle = $scope.selected ? $scope.selected.name : null;
        $scope.readOnly = true;
    }       
    
    $scope.search = '';
    $scope.searchString = null;
    $scope.activeId = null;
    $scope.resetListScroll = 0;
    //$scope.listActiveIndex = null;       

    
    var regex;
    $scope.$watch('search', function (value) {
        //console.log('value = ' + value);
        $scope.searchString = escapeRegExp(value);
        regex = new RegExp('\\b' + escapeRegExp(value), 'i');
    });
                                                                                              
    $scope.filterBySearch = function(integrator) {
        if (!$scope.search) return true;
        return regex.test(integrator.name);
    };

    $scope.filterByName = function(integrator) {
        if (integrador.name == 'Incluir Novo Integrador') {
            integrador.name = '';
        }
    };

    $scope.showDetails = function (id) {          
        $scope.activeId = id;
        $location.path('integradores/' + id);
    };
    
    $scope.refreshList = function () {
        $scope.search = '';
        $scope.searchString = null;
        $scope.activeId = null;
        $scope.selected = null;
        $location.path('integradores');
        $scope.resetListScroll = $scope.resetListScroll == 0 ? 1 : 0;
    };
    
    $scope.new = function () {
        //console.log('new');
        $scope.refresh();
        $scope.activeId = null;
        $location.path('integradores/novo');
    };
    
    $scope.edit = function () {  
        $scope.readOnly = false;
    };

    $scope.save = function() {
        $scope.selected = angular.copy($scope.editIntegrator)
        //$location.path('integradores/' + id);
        //IntegratorsService.save($scope.selected);
        $scope.readOnly = true;
        //$scope.activeId = $scope.selected.id;
        //$location.path('integradores/' + $scope.selected.id);
        //$scope.integrators = IntegratorsService.list();
        var arr = $scope.integrators;
        for (var i = 0; i < arr.length; i++) {
            if ($scope.integrators[i].id == $scope.editIntegrator.id) {
                $scope.integrators[i] = $scope.editIntegrator;
            }
        }        
    };
                                             
    $scope.refreshDetail = function (id) {
        $scope.selected = IntegratorsService.find($stateParams.id);
        $scope.detailSubtitle = $scope.selected ? $scope.selected.name : null;
        $scope.readOnly = true;    
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
        },
        {
            id: 9,
            name: '999999999',
            description: 'Integrador 9 .',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@999999.com'
                }
            ]
        },
        {
            id: 10,
            name: 'Dez',
            description: 'Novo integrador.',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@dez.com'
                }
            ]
        },
        {
            id: 11,
            name: 'Onze',
            description: 'Outro integrador.',
            contacts: [
                {
                    id: 3,
                    name: 'Pedro',
                    email: 'pedro@mail.com'
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
        },
        save: function (integrator)  {
            var old = _.find(integrators, function (integrator) {
                return integrator.id == integrator.id;
            });
            old = integrator;
        }
    }
});


function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}