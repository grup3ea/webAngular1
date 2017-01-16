'use strict';

angular.module('myApp.map', ['ngRoute', 'ngMap', 'ngGeolocation', 'ngAnimate', 'toastr'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'views/map/map.html',
            controller: 'MapCtrl'
        });
    }])

    .controller('MapCtrl', function ($scope, $http, $routeParams, $filter,
                                    $mdDialog, toastr, $route, NgMap, $geolocation) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user = {};
        $http.get(urlapi + 'users/' + $scope.storageuser._id)
        .then(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            $scope.user = data.data; // for UI

        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
        });


        $scope.myPosition={};
        $scope.geoActivated=false;
        /* primer pillem la localització no exacte a partir de la ip
        per si l'user no accepta activar la geolocalització, almenys
        així tenim la localització basada en la ip */
        var ip = $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
            ip = data;
            console.log(ip);
            $scope.myPosition={
                coords:{
                    latitude: ip.latitude,
                    longitude: ip.longitude
                }
            };
            console.log($scope.myPosition.coords);
        });
        /* geolocation */
        $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.geoActivated=true;
            $scope.myPosition = position;
            console.log($scope.myPosition.coords);
        });
        /* end of geolocation */
        /* map */
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
          });
        /* end of map */
    });
