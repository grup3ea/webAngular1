'use strict';

angular.module('myApp.settings', ['ngRoute', 'ng.deviceDetector'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsCtrl'
        });
    }])

    .controller('SettingsCtrl', function ($scope, $http, deviceDetector) {
      $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
      var vm = this;
      vm.data = deviceDetector;
      $scope.currentSession= vm.data;

        if ($scope.storageuser.role == "user") {
            $http.get(urlapi + 'users/' + $scope.storageuser._id)
                .then(function (data) {
                    console.log('data success');
                    console.log(data); // for browser console
                    //$scope.trainers = data.data; // for UI
                    //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
                    localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                    $scope.storageuser = data.data;
                }, function (data, status) {
                    console.log('data error');
                    console.log(status);
                    console.log(data);
                });
            $scope.deleteSelectedSessions = function () {
                //aqí el post
                var arrayOfDevicesToDelete = [];
                for (var i = 0; i < $scope.storageuser.tokens.length; i++) {
                    if ($scope.storageuser.tokens[i].todelete == true) {
                        arrayOfDevicesToDelete.push($scope.storageuser.tokens[i]);
                    }
                }
                console.log(arrayOfDevicesToDelete);
                $http({
                    url: urlapi + $scope.storageuser.role + 's/' + $scope.storageuser._id + "/deleteSelectedTokens",
                    method: "POST",
                    data: {devicesToDelete: arrayOfDevicesToDelete}
                })
                    .then(function (data) {
                            // success
                            console.log(data);
                            localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                            $scope.storageuser = data.data;
                        },
                        function (data) { // optional
                            // failed
                            console.log(data);
                        });
            };
        }
        else if ($scope.storageuser.role == "trainer") {
            $http.get(urlapi + 'trainers/' + $scope.storageuser._id)
                .then(function (data) {
                    console.log('data success');
                    console.log(data); // for browser console
                    //$scope.trainers = data.data; // for UI
                    //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
                    localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                    $scope.storageuser = data.data;
                }, function (data, status) {
                    console.log('data error');
                    console.log(status);
                    console.log(data);
                });
            $scope.deleteSelectedSessions = function () {
                //aqí el post
                var arrayOfDevicesToDelete = [];
                for (var i = 0; i < $scope.storageuser.tokens.length; i++) {
                    if ($scope.storageuser.tokens[i].todelete == true) {
                        arrayOfDevicesToDelete.push($scope.storageuser.tokens[i]);
                    }
                }
                console.log(arrayOfDevicesToDelete);
                $http({
                    url: urlapi + $scope.storageuser.role + 's/' + $scope.storageuser._id + "/deleteSelectedTokens",
                    method: "POST",
                    data: {devicesToDelete: arrayOfDevicesToDelete}
                })
                    .then(function (data) {
                            // success
                            console.log(data);
                            localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                            $scope.storageuser = data.data;
                        },
                        function (data) { // optional
                            // failed
                            console.log(data);
                        });
            };
        }
        else if ($scope.storageuser.role == "chef") {
            $http.get(urlapi + 'chefs/' + $scope.storageuser._id)
                .then(function (data) {
                    console.log('data success');
                    console.log(data); // for browser console
                    //$scope.trainers = data.data; // for UI
                    //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
                    localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                    $scope.storageuser = data.data;
                }, function (data, status) {
                    console.log('data error');
                    console.log(status);
                    console.log(data);
                });
            $scope.deleteSelectedSessions = function () {
                //aqí el post
                var arrayOfDevicesToDelete = [];
                for (var i = 0; i < $scope.storageuser.tokens.length; i++) {
                    if ($scope.storageuser.tokens[i].todelete == true) {
                        arrayOfDevicesToDelete.push($scope.storageuser.tokens[i]);
                    }
                }
                console.log(arrayOfDevicesToDelete);
                $http({
                    url: urlapi + $scope.storageuser.role + 's/' + $scope.storageuser._id + "/deleteSelectedTokens",
                    method: "POST",
                    data: {devicesToDelete: arrayOfDevicesToDelete}
                })
                    .then(function (data) {
                            // success
                            console.log(data);
                            localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                            $scope.storageuser = data.data;
                        },
                        function (data) { // optional
                            // failed
                            console.log(data);
                        });
            };
        }
    });
