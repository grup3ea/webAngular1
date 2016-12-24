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
                localStorage.setItem("fs_web_token", response.data.token);
                localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                window.location.reload();
                /*$timeout(function () {
                    $window.location="#!/dashboard"; //peta pq fa la petició un cop al dashboard sense afegir el token, pq no ha afegit els httpProviders
                }, 1000);*/
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
