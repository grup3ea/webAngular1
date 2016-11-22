'use strict';

angular.module('myApp.settings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsCtrl'
        });
    }])

    .controller('SettingsCtrl', function ($scope, $http) {
        
    });
