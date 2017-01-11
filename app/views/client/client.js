'use strict';

angular.module('myApp.client', ['ngRoute', 'chart.js', 'ngAnimate'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/client/:clientid', {
            templateUrl: 'views/client/client.html',
            controller: 'ClientCtrl'
        });
    }])

    .controller('ClientCtrl', function ($scope, $http, $routeParams,
        $mdToast, $mdDialog, $window, $filter) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        //agafem la data del client
        $scope.client= {};
        $http.get(urlapi + 'users/' + $routeParams.clientid)
        .then(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            $scope.client = data.data; // for UI
        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
        });

        //agafem la data del trainer
        $scope.trainer={};
        $http.get(urlapi + 'trainers/'+ $scope.storageuser._id)
          .then(function (data) {
              console.log('data success');
              console.log(data); // for browser console
              //$scope.trainers = data.data; // for UI
              //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
              $scope.trainer=data.data;
              localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
              $scope.storageuser=data.data;
          }, function (data, status) {
              console.log('data error');
              console.log(status);
              console.log(data);
          })
          .then(function (result) {
              //users = result.data;
          });


          //newRoutine dialog
          $scope.addRoutine = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
              .title('Add new routine')
              .textContent('Name the routine')
              .placeholder('Routine name')
              .ariaLabel('Dog name')
              .initialValue('')
              .targetEvent(ev)
              .ok('Create Routine')
              .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                $mdToast.show(
                   $mdToast.simple()
                      .textContent('Creating new routine: ' + result)
                      .position("bottom right")
                      .hideDelay(3000)
                );
                //POST NEW ROUTINE
                $http({
                    url: urlapi + 'routines/addToClient/' + $routeParams.clientid,
                    method: "POST",
                    data: {"title": result}
                })
                .then(function (response) {
                    // success
                    console.log("response: ");
                    console.log(response.data);
                    $window.location = "#!/editRoutine/"+response.data._id;
                },
                function (response) {
                  $mdToast.show(
                     $mdToast.simple()
                        .textContent('Failed on generating new routine')
                        .position("bottom right")
                        .hideDelay(3000)
                  );
                });
            }, function() {
              $mdToast.show(
                 $mdToast.simple()
                    .textContent('New Routine canceled')
                    .position("bottom right")
                    .hideDelay(3000)
              );
            });
          };


          $scope.data=[];
          $scope.labels=[];
          $scope.generateGraph = function(mark){
              $scope.markSelected=mark.title;
              console.log($scope.markSelected);
              /* aquí generem la data de la gràfica */
              console.log("generant data de gràfic");
              $scope.data=[];
              $scope.labels=[];
              for(var i=0; i<mark.days.length; i++)
              {
                  $scope.data.push(mark.days[i].value);
                  $scope.labels.push($filter('date')(mark.days[i].date, 'dd.MM.y'));
              }
              console.log("algoritme de generació de la data del gràfic completat");
              console.log($scope.data);
              console.log($scope.labels);
              /* end of generació de les dades de la gràfica */
          };
    });
