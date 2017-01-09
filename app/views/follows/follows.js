'use strict';

angular.module('myApp.follows', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/follows/:userid', {
            templateUrl: 'views/follows/follows.html',
            controller: 'FollowsCtrl'
        });
    }])

    .controller('FollowsCtrl', function ($scope, $http, $routeParams) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user = {};
        $http.get(urlapi + 'users/' + $routeParams.userid + '/network')
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.user = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });

        $scope.orderByMe = function(x) {
          $scope.orderBy = x;
        };
    });
