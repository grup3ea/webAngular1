'use strict';
angular.module('myApp.editUser', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editUser/:userid', {
            templateUrl: 'views/editUser/editUser.html',
            controller: 'EditUserCtrl'
        });
    }])
    .controller('EditUserCtrl', function ($scope, $http, $routeParams, $mdToast) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "user") {
            window.location = "#!/dashboard";
        };
        $scope.user={};
        $http.get(urlapi + 'users/' + $routeParams.userid)
            .then(function (data) {
                $scope.user = data.data;
            }, function (data, status) {
            })
            .then(function (result) {
            });

        $scope.updateUser = function () {
            $http({
                url: urlapi + 'users/' + $routeParams.userid,
                method: "PUT",
                data: $scope.user
            })
                .then(function (response) {
                  console.log(response);
                        $scope.user = response.data;
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('User updated')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    },
                    function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on updating user')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    });
        };
    });
