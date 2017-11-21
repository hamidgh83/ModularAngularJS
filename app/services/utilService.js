define([], function () {
    'use strict';
    return {
        name: "utilService",
        service: [function () {

            var service = {};

            service.nationalCodeGenerator = function (num) {

                var sum = 0;
                var r = 0;
                for (var i = 0; i < num.length; i++) {

                    sum += parseInt(num[i]) * (10 - i);
                }
                r = sum % 11;
                if (r < 2) {
                    return r
                } else {
                    return 11 - r;
                }
            };

            service.replaceAll = function (string, find, replace) {
                while (string.indexOf(find) > -1)
                    string = string.replace(find, replace);
                return string;
            };
            service.convertFarsiToLatinNum = function (num) {

                num = service.replaceAll(num, '۰', '0');
                num = service.replaceAll(num, '۱', '1');
                num = service.replaceAll(num, '۲', '2');
                num = service.replaceAll(num, '۳', '3');
                num = service.replaceAll(num, '۴', '4');
                num = service.replaceAll(num, '۵', '5');
                num = service.replaceAll(num, '۶', '6');
                num = service.replaceAll(num, '۷', '7');
                num = service.replaceAll(num, '۸', '8');
                num = service.replaceAll(num, '۹', '9');
                return num;
            };

            service.checkLengthValidation = function (fieldName, fieldLen, fieldDisplayName) {
                var field = $(document.getElementsByName(fieldName)).val();

                if (field.length === fieldLen) {
                    $("#" + fieldName).removeClass('has-warning');
                    $("#" + fieldName).addClass('has-success');
                    $("#" + fieldName).find('.help-block').html(SYSTEM_MESSAGE_AND_TEXT.FIELD_LENGTH + ' ' + fieldDisplayName + ' ' + SYSTEM_MESSAGE_AND_TEXT.FIELD_LENGTH_TRUE_VERB);
                } else {
                    $("#" + fieldName).removeClass('has-success');
                    $("#" + fieldName).addClass('has-warning');
                    $("#" + fieldName).find('.help-block').html(SYSTEM_MESSAGE_AND_TEXT.FIELD_LENGTH + ' ' + fieldDisplayName + ' ' + fieldLen + SYSTEM_MESSAGE_AND_TEXT.FIELD_LENGTH_VERB);

                }

            };

            service.uploadFile = function (url, file_data, callback, progresscallback) {

                var request = new FormData();
                var adsObj = new Object();
                var file_data = file_data;
                if (file_data != undefined) {

                    if (file_data.name != '') {
                        // request.append("name", 'file');
                        request.append("file", file_data , file_data.name);
                        $.ajax({
                            xhr: function () {
                                
                                var xhr = new window.XMLHttpRequest();
                                //Upload progress
                                xhr.upload.addEventListener("progress", function (e) {
                                    var complete = Math.round(e.loaded / e.total * 100);
                                    if (progresscallback)
                                        progresscallback(complete + "%");
                                }, false);
                                //Download progress
                                xhr.addEventListener("progress", function (evt) {
                                    if (evt.lengthComputable) {
                                        var percentComplete = evt.loaded / evt.total;
                                        //Do something with download progress
                                        console.log(percentComplete);
                                    }
                                }, false);
                                xhr.upload.addEventListener("error", function (evt) {
                                    // 
                                }, false);
                                xhr.upload.addEventListener("abort", function (evt) {
                                    // 
                                }, false);
                                xhr.upload.addEventListener("loadend", function (evt) {
                                    // 
                                }, false);
                                xhr.upload.addEventListener("transfercanceled", function (evt) {
                                    console.log("The transfer has been canceled by the user.");
                                }, false);
                                return xhr;
                            },

                            url: url,
                            dataType: "",
                            contentType: false,
                            async: true,
                            processData: false,
                            data: request, // Setting the data attribute of ajax with file_data
                            type: 'post',
                            success: function (data, status, headers, config) {
                                callback(data);
                            },
                            error: function (msg) {
                                console.error(msg);
                            }
                        });
                    } else {
                        console.error('no file!');
                    }
                }

            };
            return service;
        }]
    }
});


