'use strict';

angular.module('myApp.trainer', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/trainer/:trainerid', {
            templateUrl: 'views/trainer/trainer.html',
            controller: 'TrainerCtrl'
        });
    }])

    .controller('TrainerCtrl', function ($scope, $http, $routeParams, $mdToast, $mdDialog) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
        }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.trainer = {};
        $http.get(urlapi + 'trainers/' + $routeParams.trainerid)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.trainer = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });


        $scope.sendPetition = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.prompt()
            .title('Ask for routine')
            .textContent('Describe the petition')
            .placeholder('Hi, I want a routine to get prepared for an Ironman')
            .ariaLabel('Dog name')
            .initialValue('')
            .targetEvent(ev)
            .ok('Send Petition')
            .cancel('Cancel');

          $mdDialog.show(confirm).then(function(result) {

              //POST PETITION
              $http({
                  url: urlapi + 'users/sendPetitionToTrainer/' + $scope.trainer._id,
                  method: "POST",
                  data: {"message": result}
              })
              .then(function (response) {
                  // success
                  console.log("response: ");
                  console.log(response.data);
                  $window.location = "#!/training";
              },
              function (response) {
                $mdToast.show(
                   $mdToast.simple()
                      .textContent('Failed on generating new petition')
                      .position("bottom right")
                      .hideDelay(3000)
                );
              });
          }, function() {
            $mdToast.show(
               $mdToast.simple()
                  .textContent('Petition canceled')
                  .position("bottom right")
                  .hideDelay(3000)
            );
          });
        };
    });
