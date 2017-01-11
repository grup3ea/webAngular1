'use strict';

angular.module('myApp.training', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/training', {
            templateUrl: 'views/training/training.html',
            controller: 'TrainingCtrl'
        });
    }])

    .controller('TrainingCtrl', function($scope, $http) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
        }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.trainers = {};
        $http.get(urlapi + 'trainers')
            .then(function(data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.trainers = data.data; // for UI
            }, function(data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function(result) {
                //users = result.data;
            });
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
