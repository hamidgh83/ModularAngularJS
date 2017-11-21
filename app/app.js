define([
    'angular',
    './services/srv',
    'angular-ui-router',
    'angularCSS',
    'jQuery',
    'bootstrap',
    'modules/authentication/authenticationModule',
    'modules/panel/panelModule',
    'modules/config/systemConfig'
], function (angular, services) {
    'use strict';

    var systemConfig = SYSTEM_CONFIG;
    var myApp = angular.module(systemConfig.APP_NAME, [
        'ui.router',
        'angularCSS',
        systemConfig.APP_NAME + '.auth',
        systemConfig.APP_NAME + '.panel'
    ]);
    myApp.config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state(systemConfig.APP_NAME, {
                url: '',
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/app.html'
                    }
                },

            })
            .state(systemConfig.APP_NAME + '.index', {
                url: '',
                css: [
                    
                ],
                views: {
                    content: {
                        templateUrl: 'app/app.html',
                        controller: ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
                            if (localStorage.currentUser) {
                                $location.path('/panel');
                            } else {
                                $location.path('/auth/login');
                            }
                        }
                        ]
                    }
                }
            });

    }]).config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    for (var iFac = 0; iFac < services.length; iFac++) {
        myApp.factory(services[iFac].name, services[iFac].service);
    }

    myApp.directive("navbar", function () {
        return {
            restrict: 'AE',
            templateUrl: 'app/directives/navbar/nav.html',
            controller: ['$scope', '$element', '$http', '$rootScope', 'AuthServices', function ($scope, $element, $http, $rootScope, AuthServices) {
                $scope.logOut = function () {
                    AuthServices.logOut();
                    localStorage.clear();
                    $location.path('/auth/login');
                }
            }]
        };
    });

    return myApp;
});