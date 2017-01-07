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

        $http.get(urlapi + 'users/'+ $scope.storageuser._id + '/network')
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
