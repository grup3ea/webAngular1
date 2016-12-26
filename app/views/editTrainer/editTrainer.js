'use strict';
angular.module('myApp.editTrainer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editTrainer/:trainerid', {
            templateUrl: 'views/editTrainer/editTrainer.html',
            controller: 'EditTrainerCtrl'
        });
    }])
    .controller('EditTrainerCtrl', function ($scope, $http, $routeParams) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "trainer") {
            window.location = "#!/dashboard";
        }
        $http.get(urlapi + 'trainer/' + $routeParams.trainerid)
            .then(function (data) {
                $scope.trainer = data.data;
            }, function (data, status) {
            })
            .then(function (result) {
            });
        $scope.trainer = [{
            name: '',
            email: '',
            discipline: '',
            description: ''
        }];
        $scope.editTrainerProfile = function () {
            var trainer = {
                "trainerModel": {
                    "name": $scope.trainer.name,
                    "description": $scope.trainer.description,
                    "email": $scope.trainer.email,
                    "discipline": $scope.trainer.discipline,
                }
            };
            $http({
                url: urlapi + 'trainer/' + $routeParams.trainerid,
                method: "PUT",
                data: trainer
            })
                .then(function (response) {
                        $scope.trainer = response.data;
                    },
                    function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on updating trainer')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    });
        };
    });
