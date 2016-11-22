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

        $scope.options=[
          {
            title: "Users",
            description: "description",
            link: "/users",
            icon: "img/user.png"
          },
          {
            title: "Trainers",
            description: "description",
            link: "/trainers",
            icon: "img/user.png"
          },
          {
            title: "Settings",
            description: "description",
            link: "/main",
            icon: "img/user.png"
          },
          {
            title: "Logout",
            description: "description",
            link: "/logout",
            icon: "img/user.png"
          }
        ];

    });
