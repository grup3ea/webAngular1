'use strict';
angular.module('myApp.dashboard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', function ($scope) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.toggleSidebar = function () {//funcio de la barra lateral per desplegarla i plegarla
            $("#wrapper").toggleClass("toggled");
        };
    });
