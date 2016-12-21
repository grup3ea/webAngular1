'use strict';
angular.module('myApp.logout', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: "views/main/main.html",
            controller: 'LogoutCtrl'
        });
    }])
    .controller('LogoutCtrl', function ($scope, $timeout, $window) {
      console.log("logout");
        localStorage.removeItem("fs_web_token");
        localStorage.removeItem("fs_web_userdata");
        localStorage.removeItem("fs_web_role");
        $window.location="/";
    });
