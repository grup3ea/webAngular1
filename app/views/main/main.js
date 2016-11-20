'use strict';
angular.module('myApp.main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])
    .controller('MainCtrl', function ($scope, $http, $timeout, $window) {
        $scope.loginData = {};
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        console.log($scope.storageuser);
        $scope.logout = function () {
            localStorage.removeItem("fs_web_userdata");
            $timeout(function () {
                $window.location.reload(true);
            }, 1000);
        };
    });
