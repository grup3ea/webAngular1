'use strict';

angular.module('myApp.diet', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/diet', {
            templateUrl: 'views/diet/diet.html',
            controller: 'DietCtrl'
        });
    }])

    .controller('DietCtrl', function ($scope, $http) {
        if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');

        }

    });
