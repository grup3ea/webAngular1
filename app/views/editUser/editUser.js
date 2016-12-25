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
        if($scope.storageuser.role!="user")
        {
            window.location="#!/dashboard";
        }

        $scope.routine = {};
        $http.get(urlapi + 'user/' + $routeParams.userid)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.routine = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
        $scope.user=[{
            name: '',
            email: '',
            discipline: '',
            description: ''
        }];
        $scope.diets=[{
            name: '',
            email: '',
            description: ''
        }];
        $scope.trainers=[{
            name: '',
            email: '',
            description: ''
        }];
        $scope.addTrainer = function(){
            $scope.trainers.push({

            });
        };
        $scope.delTrainer = function(trainerToDel){
            var index = $scope.trainer.indexOf(trainerToDel);
            $scope.trainer.splice(index, 1);
        };
        $scope.addDiet = function(){
            $scope.clients.push({

            });
        };
        $scope.delDiet = function(dietToDel){
            var index = $scope.diets.indexOf(dietToDel);
            $scope.diets.splice(index, 1);
        };
    });
