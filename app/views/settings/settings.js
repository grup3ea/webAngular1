'use strict';

angular.module('myApp.settings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsCtrl'
        });
    }])

    .controller('SettingsCtrl', function ($scope, $http) {
      $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
      $http.get(urlapi + 'users/'+ $scope.storageuser._id)
        .then(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            //$scope.trainers = data.data; // for UI
            //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
            localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
            $scope.storageuser=data.data;
        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
            //users = result.data;
        });
    });
