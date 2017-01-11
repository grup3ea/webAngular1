'use strict';

angular.module('myApp.eating', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/eating', {
            templateUrl: 'views/eating/eating.html',
            controller: 'EatingCtrl'
        });
    }])
    .controller('EatingCtrl', function ($scope, $http) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

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
        $scope.user={};
        $http.get(urlapi + 'users/' + $scope.storageuser._id)
            .then(function(data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.user = data.data; // for UI
                if ($scope.user._id == $scope.storageuser._id) {
                    localStorage.setItem("fs_web_userdata", JSON.stringify($scope.user));
                    $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
                }
            }, function(data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function(result) {});
    });
