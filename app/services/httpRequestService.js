define([], function () {
    'use strict';
    return {
        name: "httpRequestService",
        service: ['$http', '$location',
            function ($http, $location) {
                var systemConfig = SYSTEM_CONFIG;

                var service = {};
                service.post = function (srvURL, params, successCallBack, errorCallBack) {            

                    var authorization;
                    if (!localStorage.currentUser) {
                        localStorage.clear();
                        $location.path('/auth/login');
                    }
                    else
                        authorization = systemConfig.HEADER_AUTH_PREF + angular.fromJson(localStorage.currentUser).token;

                    $http({
                        method: 'POST',
                        url: srvURL,
                        headers: {
                            'Authorization': authorization
                            , 'Content-Type': systemConfig.CONTENT_TYPE
                            , 'accept-language': systemConfig.ACCEPT_LANG
                        },
                        data: params
                    }).success(function (response) {
                        if (successCallBack)
                            successCallBack(response);
                    }).error(function (err, status, headers, config) {
                        if (err) {
                            service.errorMessageHandler(status);
                        }
                        if (errorCallBack) {
                            errorCallBack(err, status);
                        }
                    });
                };
                service.get = function (srvURL, successCallBack, errorCallBack) {
                    if (!localStorage.currentUser) {
                        localStorage.clear();
                        $location.path('/auth/login');
                        return;
                    }
                    $http({
                        method: 'GET',
                        url: srvURL,
                        headers: {
                            'Authorization': systemConfig.HEADER_AUTH_PREF
                            + angular.fromJson(localStorage.currentUser).token,
                            'Content-Type': systemConfig.CONTENT_TYPE
                        }
                    }).success(function (response) {                        
                        if (successCallBack)
                            successCallBack(response);
                    }).error(function (err, status, headers, config) {
                        service.errorMessageHandler(status);
                        if (errorCallBack)
                            errorCallBack(err, status);
                    });
                };
                service.getByParam = function (srvURL, params, successCallBack, errorCallBack) {
                    if (!localStorage.currentUser) {
                        localStorage.clear();
                        $location.path('/auth/login');
                        return;
                    }
                    $http({
                        method: 'GET',
                        url: systemConfig.SERVICE_BASE_URL + srvURL,
                        headers: {
                            'Authorization': systemConfig.HEADER_AUTH_PREF
                            + angular.fromJson(localStorage.currentUser).token,
                            'Content-Type': systemConfig.CONTENT_TYPE
                            , 'accept-language': systemConfig.ACCEPT_LANG
                        },
                        params: params
                    }).success(function (response) {
                        if (successCallBack)
                            successCallBack(response);
                    }).error(function (err, status, headers, config) {
                        service.errorMessageHandler(status);
                        if (errorCallBack)
                            errorCallBack(err, status);
                    });
                };
                service.delete = function (srvURL, successCallBack, errorCallBack) {
                    $("#please_wait_loader").show();
                    if (!localStorage.currentUser) {
                        localStorage.clear();
                        $location.path('/auth/login');
                        return;
                    }
                    var config = {
                        headers: {
                            'Authorization': systemConfig.HEADER_AUTH_PREF
                            + angular.fromJson(localStorage.currentUser).token,
                            'Content-Type': systemConfig.CONTENT_TYPE,
                            'accept-language': systemConfig.ACCEPT_LANG
                        }
                    };
                    $http.delete(srvURL, config).then(function (response) {
                        if (successCallBack)
                            successCallBack(response);
                    }, function (errResponse) {
                        service.errorMessageHandler(status);
                        if (errorCallBack)
                            errorCallBack(errResponse);
                    });
                };
                service.put = function () { };
                service.errorMessageHandler = function (errorCode) {

                    if (errorCode === 401) {
                        localStorage.clear();
                        $location.path('/auth/login');
                        return;
                    }

                };
                
                return service;
            }]
    };
});