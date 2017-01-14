'use strict';

angular.module('myApp.diet', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/diet/:dietid', {
            templateUrl: 'views/diet/diet.html',
            controller: 'DietCtrl'
        });
    }])
    .controller('DietCtrl', function ($scope, $http, $routeParams) {
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
