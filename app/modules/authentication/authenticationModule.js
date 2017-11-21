define(['angular',
    './services/index',
    './controllers/index',
    'modules/config/systemConfig',
    'angular-ui-router',
    'angularCSS'
], function (angular, services, controllers) {
    'use strict';
    var systemConfig = SYSTEM_CONFIG;

    var auth = angular.module(systemConfig.APP_NAME + '.auth', ['ui.router']);
    for (var iFac = 0; iFac < services.length; iFac++) {
        auth.factory(services[iFac].name, services[iFac].service);
    }

    for (var iCtrl = 0; iCtrl < controllers.length; iCtrl++) {
        auth.controller(controllers[iCtrl].name, controllers[iCtrl].controller);
    }

    auth.config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state(systemConfig.APP_NAME + '.auth', {
                url: '/auth/login',
                views: {
                    'content': {
                        controller: 'auth.controller',
                        templateUrl: 'app/modules/authentication/views/login.html'
                    }
                },
                css: [
                    // <!-- Global stylesheets -->
                    'app/assets/css/icons/icomoon/styles.css',
                    systemConfig.BOWER_ASSETS + '/bootstrap/dist/css/bootstrap.css',
                    'app/assets/css/custom.css'
                    // <!-- Global stylesheets -->
                ]
            });
    }]);

    return auth;
});