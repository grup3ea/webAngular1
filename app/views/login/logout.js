'use strict';
angular.module('myApp.logout', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutCtrl'
        });
    }])
    .controller('LogoutCtrl', function ($scope, $timeout, $window) {
        localStorage.removeItem("fs_web_userdata");
        $timeout(function () {
            $window.location.reload(true);
        }, 100);
    });
