'use strict';
angular.module('myApp.dashboard', ['ngRoute', 'ui.calendar', 'chart.js'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', function ($scope,$compile,uiCalendarConfig,
      $http, $window, $mdDialog, $mdToast) {
        if (localStorage.getItem('fs_web_token')) {// adding token to the headers
          console.log("user logged");
            /*$http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');*/
        }else{
          console.log("no logged");
          $window.location = "#!/login";
        }
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        /*
        inici chart
        */
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
        /*
        /chart
        */

        if($scope.storageuser.role=="user")
        {
          /* SECCiÓ USER */

          /* end SECCIÓ USER */
        }else if($scope.storageuser.role=="trainer")
        {
          /* SECCiÓ TRAINER */
          $http.get(urlapi + 'trainers/'+ $scope.storageuser._id)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                //$scope.trainers = data.data; // for UI
                //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
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
            $scope.showPrompt = function(ev) {
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
                  //post new routine
                  $http({
                      url: urlapi + 'routines',
                      method: "POST",
                      data: {"title": result}
                  })
                  .then(function (response) {
                      // success
                      console.log("response: ");
                      console.log(response.data);
                      $window.location = "#!/routine/"+response._id;
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
          /* end SECCIÓ TRAINER */
        }else if($scope.storageuser.role=="chef")
        {
          /* SECCiÓ CHEF */

          /* end SECCIÓ CHEF */
        }




    });
