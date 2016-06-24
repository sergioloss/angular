'use strict';

app.controller('IntegratorsController', ['$scope', '$stateParams', '$location', '$timeout', 'IntegratorsService', 'Page', 
                                         function ($scope, $stateParams, $location, $timeout, IntegratorsService, Page) {
    // console.log('IntegratorsController');

    Page.SetTitle('Integradores');
    $scope.integrators = IntegratorsService.list();
                                             
    $scope.search = '';
    $scope.searchString = null;    
    $scope.resetListScroll = 0;

    if ($stateParams.id == 'novo') {
        $scope.selected = {};
        $scope.detailSubtitle = 'Incluir Novo Integrador';
        $scope.readOnly = false;
        $scope.activeId = null;
    } else {
        var selected = IntegratorsService.find($stateParams.id);
        if (selected) {
            // console.log('selected');
            $scope.selected = selected;
            $scope.editIntegrator = angular.copy(selected);
            $scope.detailSubtitle = selected.name;
            $scope.readOnly = true;
            
            $scope.search = selected.name;
            $scope.searchString = selected.name;
            //$scope.showDetails(selected.id);
            $scope.selectListItem(selected.id);
            $scope.resetListScroll = new Date().getTime();
            //console.log('$scope.resetListScroll = ' + $scope.resetListScroll);
            //$scope.activeId = selected.id;
            /*
            $timeout(function() {
                //$scope.resetListScroll = $scope.resetListScroll == 1 ? 2 : 1; // Mudar o valor para acionar o $watch(reset) da directive "auto-scroll"
                $scope.selectListItem(selected.id);
            }); 
            */
        }
        //console.log('$scope.search = ' + $scope.search);
        //console.log('$scope.searchString = ' + $scope.searchString);
        //console.log('$scope.activeId = ' + $scope.activeId);
    }       
    
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

    $scope.showDetails = function (id, index) {     
        console.log('index = ' + index);
        $scope.scrollToIndex = index;
        $scope.activeId = id;
        $scope.resetListScroll = new Date().getTime();
        $location.path('integradores/' + id);
    };
    
    $scope.selectListItem = function (id) {
        $scope.activeId = id;
        $scope.resetListScroll = new Date().getTime(); // Mudar o valor para acionar o $watch(reset) da directive "auto-scroll"
        $location.path('integradores/' + id);
    }

                                             
    $scope.refreshList = function () {
        $scope.search = '';
        $scope.searchString = null;
        $scope.activeId = null;
        $scope.selected = null;
        $location.path('integradores');
        $scope.resetListScroll = $scope.resetListScroll == 0 ? -1 : 0; // Mudar o valor para acionar o $watch(reset) da directive "auto-scroll"
    };
    
    $scope.new = function () {
        $scope.refreshList();
        $location.path('integradores/novo');
    };
    
    $scope.edit = function () {  
        $scope.readOnly = false;
    };

    $scope.save = function() {
        console.log('$scope.editIntegrator.id = ' + $scope.editIntegrator.id)
        if (!$scope.readOnly) {
            $scope.selected = angular.copy($scope.editIntegrator)
            $scope.readOnly = true;
            if ($scope.editIntegrator.id) {
                for (var i = 0; i < $scope.integrators.length; i++) {
                    if ($scope.integrators[i].id == $scope.editIntegrator.id) {
                        $scope.integrators[i] = $scope.editIntegrator;
                        break;
                    }
                } 
            } else {
                var tmpId = 0;
                for (var i = 0; i < $scope.integrators.length; i++) {
                    if ($scope.integrators[i].id > tmpId) {
                        tmpId = $scope.integrators[i].id
                    }
                }
                tmpId++;
                $scope.editIntegrator.id = tmpId;
                $scope.integrators.push($scope.editIntegrator);
                $scope.activeId = $scope.editIntegrator.id;
                $scope.searchString = $scope.editIntegrator.name;
                $location.path('integradores/' + tmpId);
            }
        } else {
            console.log('Nada foi alterado.')
        }        
    };
                                             
    $scope.refreshDetail = function (id) {
        $location.path('integradores/' + id);
        $scope.editIntegrator = angular.copy($scope.selected);
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
        }
    }
});


function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}