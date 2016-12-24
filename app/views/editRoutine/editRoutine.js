'use strict';

angular.module('myApp.editRoutine', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editRoutine/:routineid', {
            templateUrl: 'views/editRoutine/editRoutine.html',
            controller: 'EditRoutineCtrl'
        });
    }])

    .controller('EditRoutineCtrl', function ($scope, $http, $routeParams, $mdToast) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
        }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if($scope.storageuser.role!="trainer")
        {
          window.location="#!/dashboard";
        }

        $scope.routine = {};
        $http.get(urlapi + 'routines/' + $routeParams.routineid)
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


        $scope.exercises=[{
          title: '',
          description: '',
          img: '',
          weight: '',
          distance: '',
          reps: '',
          series: ''
        }];
        $scope.addExercise = function(){
          $scope.exercises.push({
            title: '',
            description: '',
            img: '',
            weight: '',
            distance: '',
            reps: '',
            series: ''
          });
        };
        $scope.delExercise = function(exerciseToDel){
          var index = $scope.exercises.indexOf(exerciseToDel);
          $scope.exercises.splice(index, 1);
        };


        $scope.addDay = function(){
          $mdToast.show(
             $mdToast.simple()
                .textContent('Adding new day')
                .position("bottom right")
                .hideDelay(3000)
          );
          var newd={
            "day": {
              "title": $scope.newDay.title,
              "description": $scope.newDay.description,
              "exercises": $scope.exercises
            }
          };
          console.log(newd);
          $http({
              url: urlapi + 'routines/' + $routeParams.routineid + '/days',
              method: "POST",
              data: newd
          })
          .then(function (response) {
              // success
              console.log("day added, response: ");
              console.log(response.data);
              $scope.routine=response.data;
              $scope.newDay={};
              $scope.exercises=[{
                title: '',
                description: '',
                img: '',
                weight: '',
                distance: '',
                reps: '',
                series: ''
              }];
              //$window.location = "#!/routine/"+response._id;
          },
          function (response) {
            $mdToast.show(
               $mdToast.simple()
                  .textContent('Failed on generating new routine')
                  .position("bottom right")
                  .hideDelay(3000)
            );
          });
        };
    });
