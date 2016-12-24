'use strict';

angular.module('myApp.client', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/client/:clientid', {
            templateUrl: 'views/client/client.html',
            controller: 'ClientCtrl'
        });
    }])

    .controller('ClientCtrl', function ($scope, $http, $routeParams, $mdToast, $mdDialog, $window) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
        }*/
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
                    $window.location = "#!/routine/"+response.data._id;
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
    });
