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
        }
        $scope.routine = {};
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
            image: ''
        }];
        $scope.user.attributes = [{
            weight: '',
            height: '',
            gender: '',
            age: ''
        }];
        $scope.editAttributes = [{}];
        scope.editUser = [{}];
    });
