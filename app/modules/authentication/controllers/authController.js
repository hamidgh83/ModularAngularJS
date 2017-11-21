define([
    './module'
], function () {
    'use strict';

    return {
        name: "auth.controller",
        controller: ['$scope', '$rootScope', '$location', 'AuthServices', function ($scope, $rootScope, $location, AuthServices) {
            // reset login status
            AuthServices.logOut();
            $scope.application_assets = SYSTEM_CONFIG.APPLICATION_ASSETS;
            $scope.dataLoading = false;
            $scope.login = function () {
                $scope.dataLoading = true;
                $scope.errorFlag = false;
                AuthServices.login(SYSTEM_CONFIG.SERVICE_BASE_URL + SYSTEM_CONFIG.AUTH_SRV.LOGIN, $scope.username, $scope.password,
                    function (response, msg) {
                        $scope.dataLoading = false;
                        if (response) {
                            $scope.errorFlag = false;
                            AuthServices.getRol(function (data) {

                                AuthServices.setCurrentUserRol(data);
                                $(document.body).removeClass('loginBk');
                                $location.path('/panel/dashboard');
                            });
                        }
                        else {
                            $scope.hasError = true;
                            $scope.message = "Response failed!";
                            $scope.statusCode = 500;
                        }
                    }, function(error, status) {
                        $scope.dataLoading = false;
                        $scope.hasError = true;
                        $scope.statusCode = status;
                        if(status === 404)
                            $scope.message = "Username or password is incorrect.";
                        else
                            $scope.message = "Server reponse failed.";

                    });
            };
        }
        ]
    };
});