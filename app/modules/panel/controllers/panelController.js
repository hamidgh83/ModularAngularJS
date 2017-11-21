define([
    './module',
], function () {
    'use strict';

    return {
        name: "panel.controller",
        controller: ['$scope', '$rootScope', '$interval', '$location', 'AuthServices',
            function ($scope, $rootScope, $interval, $location, AuthServices) {

                $rootScope.pageTitle = null;

                // Deny access to panel without login
                if (localStorage.currentUser === undefined) {
                    $location.path('/auth/login');
                }
                else {
                    $scope.systemConfig = SYSTEM_CONFIG;
                    $scope.application_assets = $scope.systemConfig.APPLICATION_ASSETS;

                    $scope.logOut = function () {
                        AuthServices.logOut();
                        localStorage.clear();
                        $location.path('/auth/login');
                    }
                    $scope.$on('$viewContentLoaded', function () {
                        $scope.user = angular.fromJson(localStorage.currentUser);

                        if($location.path() == '/panel')
                            $location.path('/panel/dashboard');
                    });
                }

            }
        ]
    };
});