'use strict';

angular.module('myApp.editTrainer', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editTrainer/:trainerid', {
            templateUrl: 'views/editTrainer/editTrainer.html',
            controller: 'EditTrainerCtrl'
        });
    }])

    .controller('EditTrainerCtrl', function ($scope, $http, $routeParams, $mdToast) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if($scope.storageuser.role!="trainer")
        {
            window.location="#!/dashboard";
        }

        $scope.routine = {};
        $http.get(urlapi + 'trainer/' + $routeParams.trainerid)
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
        $scope.trainer=[{
            name: '',
            email: '',
            discipline: '',
            description: ''
        }];
        $scope.clients=[{
            name: '',
            email: '',
            description: ''
        }];
        $scope.addClient = function(){
            $scope.clients.push({

            });
        };
        $scope.delClient = function(clientToDel){
            var index = $scope.clients.indexOf(clientToDel);
            $scope.clients.splice(index, 1);
        };
    });
