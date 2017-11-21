define([
    '../panelModule'
], function (Authentication) {
    'use strict';
    return {
        name: "PanelService",
        service: ['httpRequestService',
            function (httpRequestService) {

                var systemConfig = SYSTEM_CONFIG;
                var service = {};

                service.getList = function (srvURl, callback) {
                    httpRequestService.get(srvURl, function (response) {
                        callback(response);
                    }, function (err, status, headers, config) {
                        //
                    });
                };

                service.getListByParams = function (url, params, callback) {
                    httpRequestService.getByParam(url,
                        params,
                        function (response) {
                            callback(response.items);
                        },
                        function (err, status, headers, config) {
                        });
                };

                service.getItem = function (url, params, callback) {
                    httpRequestService.getByParam(url,
                        params,
                        function (response) {
                            callback(response.items);
                        },
                        function (err, status, headers, config) {
                        });
                };

                service.save = function (addSrvURL, info, success, error) {
                    httpRequestService.post(addSrvURL, info
                        , function (response) {
                            if (success)
                                success(response);
                        }, function (err, status, headers, config) {
                            if (error)
                                error(err, status);
                        });
                };

                service.search = function (url, term, callback) {
                    httpRequestService.getByParam(url,
                        term,
                        function (response) {
                            callback(response.items);
                        },
                        function (err, status, headers, config) {
                        });
                };

                service.getPager = function (totalItems, currentPage, pageSize) {
                    // default to first page
                    currentPage = currentPage || 1;

                    // default page size is 10
                    pageSize = pageSize || 10;

                    // calculate total pages
                    var totalPages = Math.ceil(totalItems / pageSize);

                    var startPage, endPage;
                    if (totalPages <= 10) {
                        // less than 10 total pages so show all
                        startPage = 1;
                        endPage = totalPages;
                    } else {
                        // more than 10 total pages so calculate start and end pages
                        if (currentPage <= 6) {
                            startPage = 1;
                            endPage = 10;
                        } else if (currentPage + 4 >= totalPages) {
                            startPage = totalPages - 9;
                            endPage = totalPages;
                        } else {
                            startPage = currentPage - 5;
                            endPage = currentPage + 4;
                        }
                    }

                    // calculate start and end item indexes
                    var startIndex = (currentPage - 1) * pageSize;
                    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

                    // create an array of pages to ng-repeat in the pager control
                    var i;
                    var pages = [];
                    for(i=startPage; i < endPage + 1; i++) {
                        pages.push(i);
                    }

                    // return object with all pager properties required by the view
                    return {
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        totalPages: totalPages,
                        startPage: startPage,
                        endPage: endPage,
                        startIndex: startIndex,
                        endIndex: endIndex,
                        pages: pages
                    };
                };

                return service;
            }]
    };
});