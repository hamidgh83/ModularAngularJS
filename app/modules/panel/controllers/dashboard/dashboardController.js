define([
    'angular',
    '../module',
], function (angular, controllers) {
    'use strict';

    return {
        name: "dashboard.controller",
        controller: ['$scope', '$interval', '$rootScope', 'PanelService',
            function ($scope, $interval, $rootScope, PanelService) {
                
                $scope.message = 'Welcome to dashboard';
                
            }
        ]
    };
});