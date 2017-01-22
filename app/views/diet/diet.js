'use strict';
angular.module('myApp.diet', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/diet/:dietid', {
            templateUrl: 'views/diet/diet.html',
            controller: 'DietCtrl'
        });
    }])
    .controller('DietCtrl', function ($scope, $http, $routeParams, $mdToast) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
         $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
         //el .common serveix per als gets
         $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');

         }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.diet = {};
        $http.get(urlapi + 'diets/' + $routeParams.dietid)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.diet = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
        $scope.selectDiet = function (diet) {
            $http({
                url: urlapi + 'diets/choose/' + diet._id,
                method: "POST",
                data: {"dietid": diet}
            })
                .then(function (data) {
                    console.log("Dia Seleccionado");
                    console.log(data.data);
                    $scope.diet = data.data;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Add Diet to personal Diets')
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                })
        };
        $scope.unselectDiet = function (diet) {
            $http({
                url: urlapi + 'diets/choose/' + diet._id,
                method: "DELETE",
                data: {"dietid": diet}
            })
                .then(function (data) {
                    console.log(data.data);
                    $scope.diet = data.data;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Removed Diet from personal Diets')
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                })
        };
        $scope.markDayAsCompleted = function (givenday) {
            $http({
                url: urlapi + 'diets/completeDay/' + $routeParams.dietid,
                method: "POST",
                data: {"dayid": givenday._id}
            })
                .then(function (data) {
                    // success
                    console.log("Dia completado, tus puntos tienes ya ");
                    console.log(data.data);
                    $scope.diet = data.data; // for UI
                })
        };
    });
