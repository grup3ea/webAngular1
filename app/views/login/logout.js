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
        localStorage.removeItem("fs_web_userdata");
        $window.location="#!/main";
    });
