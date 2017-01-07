'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search/:searchstring', {
            templateUrl: 'views/search/search.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', function ($scope, $http, $routeParams) {
      $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
      $scope.searchstring=$routeParams.searchstring;
        $scope.searchresults={};
        $http.get(urlapi + 'search/'+ $routeParams.searchstring)
          .then(function (data) {
          console.log(data.data);
              $scope.searchresults=data.data;
          }, function (data, status) {
              console.log('data error');
              console.log(status);
              console.log(data);
          })
          .then(function (result) {
              //users = result.data;
          });
    });
