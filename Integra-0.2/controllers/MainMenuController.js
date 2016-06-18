'use strict';

app.controller('MainMenuController', ['$scope', '$mdDialog', '$location', function ($scope, $mdDialog, $location) {

    this.changeView = function(view) {
        $location.path(view); 
    }
    
    this.sampleAction = function(name, ev) {
        $mdDialog.show($mdDialog.alert()
            .title(name)
            .textContent('You triggered the "' + name + '" action')
            .ok('OK')
            .targetEvent(ev)
        );
    };
    
}]);

