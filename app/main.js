/* full config   https://github.com/requirejs/r.js/blob/master/build/example.build.js */
require.config({
    waitSeconds: 60,
    baseUrl: "app",
    paths: {
        'jQuery': 'assets/js/core/libraries/jquery.min',
        'angular': 'lib/bower/angular/angular',
        'angular-ui-router': 'lib/bower/angular-ui-router/release/angular-ui-router',
        'angular-animate': 'lib/bower/angular-animate/angular-animate.min',
        'angularCSS': 'lib/bower/angular-css/angular-css',
        'async': 'lib/requirejs-async/async',
        'bootstrap': 'lib/bower/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'angular': { exports: 'angular', deps: ['jQuery'] },
        'jQuery': { exports: '$' },
        'bootstrap': ['jQuery'],
        'angular-ui-router': ['angular'],
        'angularCSS': ['angular'],
    },
    deps: ['app']
});
require(['angular', 'app'], function (angular) {
    'use strict';
    angular.bootstrap(document, ['myApp']);
});