'use strict';

angular.module('myApp.notifications', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/notifications', {
            templateUrl: 'views/notifications/notifications.html',
            controller: 'NotificationsCtrl'
        });
    }])

    .controller('NotificationsCtrl', function ($scope, $http) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
            //el .common serveix per als gets
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
        }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.notifications={};
        $http.get(urlapi + $scope.storageuser.role + 's/'+ $scope.storageuser._id + "/getNotifications")
          .then(function (data) {
              console.log('data success');
              console.log(data); // for browser console
              $scope.notifications=data.data;
          }, function (data, status) {
              console.log('data error');
              console.log(status);
              console.log(data);
          })
          .then(function (result) {
              //users = result.data;
          });
    });
