'use strict';
angular.module('myApp.sidenav', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sidenav', {
            templateUrl: 'views/sidenav.html',
            controller: 'SidenavCtrl'
        });
    }])
    .controller('SidenavCtrl', function ($scope, $http, $timeout, $window, $mdSidenav) {
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        }
      }


      /* lu comú amb totes les views de la webapp
        posat aquí al menú */
        $scope.loginData = {};
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        console.log($scope.storageuser);
        var pathImg="img/essential/";
        $scope.options=[
          {
            title: "Dashboard",
            description: "description",
            link: "/dashboard",
            icon: pathImg + "stopwatch-4.png"
          },
          {
            title: "Users",
            description: "description",
            link: "/users",
            icon: pathImg + "users-1.png"
          },
          {
            title: "Trainers",
            description: "description",
            link: "/trainers",
            icon: pathImg + "television-1.png"
          },
          {
            title: "Settings",
            description: "description",
            link: "/settings",
            icon: pathImg + "settings.png"
          },
          {
            title: "Logout",
            description: "description",
            link: "/logout",
            icon: pathImg + "power.png"
          }
        ];

    });
