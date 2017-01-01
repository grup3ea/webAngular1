'use strict';
angular.module('myApp.login', ['ngRoute', 'ng.deviceDetector'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    .controller('LoginCtrl', function ($scope, $http, $timeout, $window, $mdToast, deviceDetector) {
      var vm = this;
      vm.data = deviceDetector;
      console.log("userAgent: " + vm.data.raw.userAgent);
        $scope.loginData = {};
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);
            $scope.loginData.userAgent=vm.data.raw.userAgent;//aquí li afegin el userAgent al post del loginData
            $scope.loginData.os=vm.data.os;
            $scope.loginData.browser=vm.data.browser;
            $scope.loginData.device=vm.data.device;
            $scope.loginData.os_version=vm.data.os_version;
            $scope.loginData.browser_version=vm.data.browser_version;
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
