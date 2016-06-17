'use strict';

app.controller('IntegratorsController', ['$scope', '$stateParams', 'IntegratorsService', 'Page', function ($scope, $stateParams, IntegratorsService, Page) {
    Page.SetTitle('Integradores');
    $scope.viewTitle = 'Integradores';
    $scope.integrators = IntegratorsService.list();
    $scope.selected = IntegratorsService.find($stateParams.id)
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
