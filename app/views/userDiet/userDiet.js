'use strict';

angular.module('myApp.userDiet', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/userDiet', {
            templateUrl: 'views/userDiet/userDiet.html',
            controller: 'UserDietCtrl'
        });
    }])
    .controller('UserDietCtrl', function ($scope, $http) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');

        }*/
        $scope.diets = {};
        $http.get(urlapi + 'diets')
            .success(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.diets = data; // for UI
                localStorage.setItem('fs_web_diets', JSON.stringify($scope.diets));
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });

    });
