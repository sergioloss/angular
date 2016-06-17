'use strict';

app.controller('MainMenuController', ['$mdDialog', function ($mdDialog) {
    this.sampleAction = function(name, ev) {
        $mdDialog.show($mdDialog.alert()
            .title(name)
            .textContent('You triggered the "' + name + '" action')
            .ok('OK')
            .targetEvent(ev)
        );
    };
}]);

