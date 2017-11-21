define([], function () {
    'use strict';
    return {
        name: "AuthServices",
        service: ['httpRequestService', '$location',
            function (httpRequestService, $location) {
                var systemConfig = SYSTEM_CONFIG;
                var service = {};

                service.login = function (srvUrl, username, password, callback, errorCallback) {

                    httpRequestService.post(srvUrl, { username: username, password: password }
                        , function (response) {
                            // login successful if there's a token in the response
                            if (response.accessToken) {

                                // store username and token in local storage to keep user logged in between page refreshes
                                localStorage.currentUser = angular.toJson({ username: username, token: response.accessToken, fullname: response.fullName });

                                // execute callback with true to indicate successful login
                                callback(true);
                            } else {
                                // execute callback with false to indicate failed login
                                callback(false);
                            }
                        }, function (error, status) {
                            errorCallback(error, status);
                        });
                };
                service.logOut = function () {
                    $(document.body).addClass('login-container loginBk');
                    // delete localStorage.currentUser;
                    localStorage.clear();

                    $location.path('/auth/login');
                };
                service.getRol = function (callback) {
                    httpRequestService.get(systemConfig.SERVICE_BASE_URL + systemConfig.ACCOUNTS_SRV.ACCOUNTME, function (response) {
                        callback(response);
                    }, function (err, status, headers, config) {
                        // 
                    });
                };
                service.setCurrentUserRol = function (currentUserRol) {

                    if (currentUserRol.role === 'admin') {
                        localStorage.isSuperAdmin = true;
                        localStorage.role = angular.toJson(currentUserRol.role);
                    }
                    else {
                        localStorage.isSuperAdmin = false;
                    }
                }
                return service;
            }]

    };
});