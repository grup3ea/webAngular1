'use strict';
angular.module('myApp.editUser', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editUser/:userid', {
            templateUrl: 'views/editUser/editUser.html',
            controller: 'EditUserCtrl'
        });
    }])
    .controller('EditUserCtrl', function ($scope, $http, $routeParams) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "user") {
            window.location = "#!/dashboard";
        };

        $http.get(urlapi + 'user/' + $routeParams.userid)
            .then(function (data) {
                $scope.routine = data.data;
            }, function (data, status) {
            })
            .then(function (result) {
            });
        $scope.user = [{
            name: '',
            email: '',
            description: '',
            image: '',
            attributes: [{
                weight: '',
                height: '',
                gender: '',
                age: ''
            }]
        }];
        $scope.updateUser = function () {
            var user = {
                "userModel": {
                    "name": $scope.user.name,
                    "description": $scope.user.description,
                    "email": $scope.user.email,
                    "image": $scope.user.image,
                    "attributes": {
                        "weight" : $scope.user.attributes.weight,
                        "height" : $scope.user.attributes.height,
                        "gender" : $scope.user.attributes.gender,
                        "age" : $scope.user.attributes.age,
                    }
                }
            };
            $http({
                url: urlapi + 'user/' + $routeParams.userid,
                method: "PUT",
                data: user
            })
                .then(function (response) {
                        $scope.user = response.data;
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
