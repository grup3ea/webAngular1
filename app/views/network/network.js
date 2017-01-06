'use strict';

angular.module('myApp.network', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/network', {
            templateUrl: 'views/network/network.html',
            controller: 'NetworkCtrl'
        });
    }])

    .controller('NetworkCtrl', function ($scope, $http) {
      $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.users = {};
        $http.get(urlapi + 'users')
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
