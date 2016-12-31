'use strict';

angular.module('myApp.trainersSearcher', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/trainersSearcher', {
            templateUrl: 'views/trainersSearcher/trainersSearcher.html',
            controller: 'TrainersSearcherCtrl'
        });
    }])

    .controller('TrainersSearcherCtrl', function ($scope, $http) {
      $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

      $scope.disciplines=[
        {
          name: "bodybuilding"
        },
        {
          name: "running"
        },
        {
          name: "ironman"
        }
      ];
      $scope.trainers={};
      $scope.searchDiscipline = function(discipline){
        $scope.choosenDiscipline={
          discipline: discipline.name
        };
        console.log($scope.choosenDiscipline);
        $http({
            url: urlapi + 'trainers/searchByDiscipline',
            method: "POST",
            data: $scope.choosenDiscipline
        })
        .then(function(data) {
                // success
                console.log("response: ");
                console.log(data.data);
                $scope.trainers=data.data;
        },
        function(response) { // optional
                // failed
                console.log(response);
        });
      };

    });
