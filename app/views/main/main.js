'use strict';
angular.module('myApp.main', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])
    .controller('MainCtrl', function ($scope, $http, $timeout, $window) {
        if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');

        }
        $scope.loginData = {};
        $scope.logout = function () {
            localStorage.removeItem("fs_web_userdata");
            $timeout(function () {
                $window.location.reload(true);
            }, 1000);
        };
    });
