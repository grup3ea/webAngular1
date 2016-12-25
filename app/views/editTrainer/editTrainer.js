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
        $scope.editProfile = function () {
        };
    });
