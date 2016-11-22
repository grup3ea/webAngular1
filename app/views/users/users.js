'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'views/users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', function ($scope, $http) {
        if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');

        }

        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.users = {};
        $http.get(urlapi + 'users/clients')
            .success(function (data, status, headers, config) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.users = data; // for UI
                localStorage.setItem('fs_web_users', JSON.stringify($scope.users));
            })
            .error(function (data, status, headers, config) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
                //users = result.data;
            });
    });
