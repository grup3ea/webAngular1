'use strict';
angular.module('myApp.training', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/training', {
            templateUrl: 'views/training/training.html',
            controller: 'TrainingCtrl'
        });
    }])
    .controller('TrainingCtrl', function ($scope, $http) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.trainers = {};
        $http.get(urlapi + 'trainers')
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.trainers = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
                //users = result.data;
            });
        $scope.user = {};
        $http.get(urlapi + 'users/' + $scope.storageuser._id)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.user = data.data; // for UI
                if ($scope.user._id == $scope.storageuser._id) {
                    localStorage.setItem("fs_web_userdata", JSON.stringify($scope.user));
                    $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
                }
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });

    });
