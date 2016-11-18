'use strict';
angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', function($scope, $http, $timeout, $window) {

    $scope.loginData = {};
    $scope.storageusername=JSON.parse(localStorage.getItem("fs_web_userdata"));
console.log($scope.storageusername);
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $http({
          url: urlapi + 'login',
          method: "POST",
          data: $scope.loginData
      })
      .then(function(response) {
              // success
              console.log("response: ");
              console.log(response.data);
              if(response.data.success==true)
              {
                  console.log("login successful. Response.data: ");
                  console.log(response.data);
                  localStorage.setItem("fs_web_token", response.data.user.token);
                  localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));

                  $timeout(function() {
                    $window.location="#!/dashboard";
                  }, 1000);
              }else{
                  console.log("login failed");
                  $ionicLoading.show({ template: 'Login failed, user or password error.', noBackdrop: true, duration: 2000 });
              }


      },
      function(response) { // optional
              // failed
              console.log(response);
      });
    };
    $scope.logout = function(){
      localStorage.removeItem("fs_web_userdata");
      $timeout(function() {
        $window.location.reload(true);
      }, 1000);
    };
});
