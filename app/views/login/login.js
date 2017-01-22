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
        var ip = $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
            ip = JSON.stringify(data);
            console.log(ip);
        });
        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: '6LcyxhIUAAAAAOJdzM6c9KKv80LVkc2TkJcF4YcN'
        };
        $scope.setResponse = function (response) {
            console.info('Response available');
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };
        $scope.cbExpiration = function() {
            console.info('Captcha expired. Resetting response object');
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };
        console.log("userAgent: " + vm.data.raw.userAgent);

        $scope.loginData = {};
        $scope.doLogin = function () {
            var valid;

            console.log('Doing login', $scope.loginData);
            $scope.loginData.userAgent=vm.data.raw.userAgent;//aquí li afegin el userAgent al post del loginData
            $scope.loginData.os=vm.data.os;
            $scope.loginData.browser=vm.data.browser;
            $scope.loginData.device=vm.data.device;
            $scope.loginData.os_version=vm.data.os_version;
            $scope.loginData.ip = ip;
            $scope.loginData.browser_version=vm.data.browser_version;
            /**
             * SERVER SIDE VALIDATION
             **/
            $http({
                url: urlapi + 'users/login',
                method: "POST",
                data: $scope.loginData

            })
                .then(function (response) {
                        console.log('sending the captcha response to the server', $scope.response);
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
                            vcRecaptchaService.reload($scope.widgetId);
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
        };


        /* signup */
        $scope.doSignup = function () {
            console.log('Doing signup', $scope.signupData);
            if ($scope.emptyParams($scope.signupData)) {
                $http({
                    url: urlapi + 'users/register',
                    method: "POST",
                    data: $scope.signupData
                })
                .then(function (response) {
                        // success
                        //console.log(signupData.myRecaptchaResponse);
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
                        console.log('Email already in use');
                    });
            } else {
                console.log('First complete all parameters');
            }
        };
        $scope.emptyParams = function (obj) {
            if (obj.name == undefined) {
                return (false);
            }
            if (obj.password == undefined) {
                return (false);
            }
            if (obj.email == undefined) {
                return (false);
            }
            return (true);
        };
    });
