'use strict';

app.controller('IntegratorsController', [
    '$scope',
    '$stateParams',
    '$location',
    '$timeout',
    '$compile',
    'IntegratorsService',
    'Page',
    function ($scope, $stateParams, $location, $timeout, $compile, IntegratorsService, Page) {
        //console.log('IntegratorsController');
        
        Page.SetTitle('Integradores');
        $scope.integrators = IntegratorsService.list();
        $scope.newContactFlag = false;
        
        if ($stateParams.id == 'novo') {
            $scope.search = '';
            $scope.searchString = null;    
            $scope.selected = {};
            $scope.detailSubtitle = 'Incluir Novo Integrador';
            $scope.readOnly = false;
            $scope.activeId = null;
        } else if ($stateParams.id != '') {        
            var selected = IntegratorsService.find($stateParams.id);
            if (selected) {  
                //console.log('selected');
                $scope.selected = selected;
                $scope.editIntegrator = angular.copy(selected);
                $scope.detailSubtitle = selected.name;
                $scope.readOnly = true; 

                $scope.selectListItem(selected.id);
            }
        }       
                                             
        var regex;
        $scope.$watch('search', function (value) {
            regex = new RegExp('\\b' + escapeRegExp(value), 'i');
            $scope.resetListScroll();
        });
                                                                                              
        $scope.filterBySearch = function(integrator) {
            if (!$scope.search) return true;
            return regex.test(integrator.name);
        };
        
        $scope.selectListItem = function (id) {
            $scope.activeId = id;
            $location.path('integradores/' + id);
            
            $scope.resetListScroll();
        };
        
        $scope.showDetails = function (id) {     
            $scope.activeId = id;
            $location.path('integradores/' + id);
            
            //$scope.resetListScroll();
        };
        
        $scope.refreshList = function () {
            $scope.activeId = null;
            $scope.selected = null;
            $location.path('integradores');
            
            $scope.resetListScroll();
        };
        
        $scope.resetListScroll = function() {
            // to fire the auto-scroll function
            $timeout(function () {
                // Mudar o valor de resetListScrollFlag para acionar o $watch(reset) da directive "auto-scroll"
                $scope.resetListScrollFlag = new Date().getTime();
            });
        };

        $scope.getListItemIndex = function (id) {
            // Get the list index for auto-scroll function  
            var i = 0;
            for (i = 0; i < $scope.integrators.length; i++) {
                if ($scope.integrators[i].id == id) {
                    break;
                }
            }
            return i;
        };
    
        $scope.new = function () {
            $scope.refreshList();
            $location.path('integradores/novo');
        };
        
        $scope.createNewContact = function () {
            $scope.newContactFlag = true;
        };
        
        $scope.insertNewContact = function () {
            var newContactId = 0;
            if ($scope.editIntegrator.contacts.length) {
                for (var i = 0; i < $scope.editIntegrator.contacts.length; i++) {
                    if ($scope.editIntegrator.contacts[i].id > i) {
                        newContactId = $scope.editIntegrator.contacts[i].id;
                    }
                }
            }
            newContactId++;
            $scope.newContact = {id: newContactId, name: $scope.newContact.name, email: $scope.newContact.email };
            $scope.editIntegrator.contacts.push($scope.newContact);
            
            $timeout( function () {
                $scope.resetNewContact();
            });
            
            /*
            $timeout( function () {
                //$scope.form.$setPristine();                
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                //$scope.form.contact_email.$setValidity();
            });
            */
        };
    
        $scope.edit = function () {
            $scope.readOnly = false;
        };

        $scope.save = function() {
            // console.log('$scope.editIntegrator.id = ' + $scope.editIntegrator.id)
            if (!$scope.readOnly || $scope.newContact) {
                $scope.readOnly = true;
                
                var id = $scope.editIntegrator.id;
                
                if (id) { // UPDATE
                    for (var i = 0; i < $scope.integrators.length; i++) {
                        if ($scope.integrators[i].id == id) {
                            $scope.selected = angular.copy($scope.editIntegrator);
                            $scope.integrators[i] = $scope.selected;
                            break;
                        }
                    } 
                } else { // INSERT
                    var newId = 0;
                    for (var i = 0; i < $scope.integrators.length; i++) {
                        if ($scope.integrators[i].id > newId) {
                            newId = $scope.integrators[i].id
                        }
                    }
                    newId++;
                    $scope.editIntegrator.id = newId;
                    $scope.selected = angular.copy($scope.editIntegrator);
                    $scope.integrators.push($scope.selected);
                    
                    $scope.activeId = $scope.selected.id;
                    // $scope.searchString = $scope.editIntegrator.name;
                    $location.path('integradores/' + newId);
                    
                    $scope.resetListScroll();
                }
            } else {
                console.log('Nada foi alterado.')
            }        
        };
                                             
        $scope.refreshDetail = function (id) {
            $location.path('integradores/' + id);
            $scope.editIntegrator = angular.copy($scope.selected);
            $scope.readOnly = true;
            $scope.resetNewContact();
        };

        $scope.resetNewContact = function () {
            $scope.newContactDefault = {
                name: "",
                email: ""
            };
            $scope.newContact = angular.copy($scope.newContactDefault);   
            
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.newContactFlag = false;

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


function escapeRegExp (string) {
    var result = '';
    if (string !== undefined) {
        result = string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    return result;
}