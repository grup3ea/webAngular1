'use strict';
angular.module('myApp.passport', ['ngRoute', 'chart.js'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/passport', {
            templateUrl: 'views/passport/passport.html',
            controller: 'PassportCtrl'
        });
    }])
    .controller('PassportCtrl', function ($scope, $compile,
                                           $http, $window, $mdDialog, $mdToast,
                                           $filter) {
        console.log("passport");
    });
