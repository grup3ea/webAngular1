
var urlapi = "http://147.83.7.158:3005/api/";


var app = angular.module('landingpageApp', []);
app.controller('landingpageCtrl', function($scope, $http) {

  console.log("landingpage");
  $scope.trainers = {};
  $http.get(urlapi + 'trainers')
      .success(function (data) {
          console.log('data success');
          console.log(data); // for browser console
          $scope.trainers = data; // for UI
          localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
      })
      .error(function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
      })
      .then(function (result) {
          //users = result.data;
      });

});
