define([
    'angular',
    './services/index',
    './controllers/index',
    'modules/config/systemConfig',
    'angular-ui-router'
], function (angular, services, controllers) {
    'use strict';

    var systemConfig = SYSTEM_CONFIG;

    var panel = angular.module(systemConfig.APP_NAME + '.panel', ['ui.router']);

    for (var iFac = 0; iFac < services.length; iFac++) {
        panel.factory(services[iFac].name, services[iFac].service);
    }
    for (var iCtrl = 0; iCtrl < controllers.length; iCtrl++) {
        panel.controller(controllers[iCtrl].name, controllers[iCtrl].controller);
    }

    panel.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state(systemConfig.APP_NAME + '.panel', {
                url: '/panel',
                css: [
                    // <!-- Global stylesheets -->

                    // <!-- Global stylesheets -->
                ],
                views: {
                    'content': {
                        controller: 'panel.controller',
                        templateUrl: 'app/modules/panel/views/panel.html'
                    }
                },
            }).state(systemConfig.APP_NAME + '.panel.dashboard', {
                parent: systemConfig.APP_NAME + '.panel',
                url: '/dashboard',
                css: [
                    // <!-- Global stylesheets -->
                    systemConfig.BOWER_ASSETS + '/bootstrap/dist/css/bootstrap.css',
                    systemConfig.APPLICATION_ASSETS + '/css/icons/icomoon/styles.css',
                    systemConfig.APPLICATION_ASSETS + '/css/custom.css'
                    // <!-- Global stylesheets -->
                ],
                views: {
                    'content': {
                        controller: 'dashboard.controller',
                        templateUrl: 'app/modules/panel/views/dashboard/dashboard.html'
                    }
                }
            });
    }]);
    return panel;
});