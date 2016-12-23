'use strict';
angular.module('myApp.signup', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'views/signup/signup.html',
            controller: 'SignupCtrl'
        });
    }])
    .controller('SignupCtrl', function ($scope, $http, $timeout, $window) {
        $scope.signupData = {};
        if (localStorage.getItem("fs_web_userdata")) {
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
            $window.location = "#";
        } else {
        }
        $scope.doSignup = function () {
            console.log('Doing signup', $scope.signupData);
            if ($scope.emptyParams($scope.signupData)) {
                $http({
                    url: urlapi + $scope.signupData.role+'s/register',
                    method: "POST",
                    data: $scope.signupData
                })
                .then(function (response) {
                        // success
                        console.log("response: ");
                        console.log(response.data);
                        $timeout(function () {
                            $window.location = "#!/login";
                        }, 1000);
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
