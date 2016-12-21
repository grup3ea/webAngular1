'use strict';
angular.module('myApp.login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    .controller('LoginCtrl', function ($scope, $http, $timeout, $window, $mdToast) {
        $scope.loginData = {};
        if (localStorage.getItem("fs_web_userdata")) {
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
            $window.location = "#";
        } else {
        }
        console.log($scope.storageuser);
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);
            $http({
                url: urlapi + $scope.loginData.role+ 's/login',
                method: "POST",
                data: $scope.loginData
            })
                .then(function (response) {
                        // success
                        console.log("response: ");
                        console.log(response.data);
                        if (response.data.success == true) {
                            console.log("login successful. Response.data: ");
                            console.log(response.data);
                            localStorage.setItem("fs_web_token", response.data.token);
                            localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                            $timeout(function () {
                                $window.location="#!/dashboard";
                            }, 1000);
                        } else {
                            console.log("login failed");
                            $mdToast.show(
                               $mdToast.simple()
                                  .textContent('Account not found')
                                  .position("bottom right")
                                  .hideDelay(3000)
                            );
                            //$ionicLoading.show({ template: 'Login failed, user or password error.', noBackdrop: true, duration: 2000 });
                        }
                    },
                    function (response) { // optional
                        // failed
                        console.log(response);
                    });
        };/*
        $scope.logout = function () {
            localStorage.removeItem("fs_web_userdata");
            $timeout(function () {
                $window.location.reload(true);
            }, 1000);
        };*/
    });
