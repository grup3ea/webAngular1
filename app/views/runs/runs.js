'use strict';

angular.module('myApp.runs', ['ngRoute', 'ngMap', 'ngGeolocation', 'ngAnimate', 'toastr'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/runs/:userid', {
            templateUrl: 'views/runs/runs.html',
            controller: 'RunCtrl as vm'
        });
    }])

    .controller('RunCtrl', function ($scope, $http, $routeParams, $filter,
                                    $mdDialog, toastr, $route, NgMap, $geolocation) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user=[];
        $scope.run={};
        $scope.centerPos={
            lat: 0,
            long: 0
        };
        var vm = this;
        vm.run={
            name: "polyline",
            path: [[]]
        };
        $scope.selectRun=function(run){
            $http.get(urlapi + "runs/byRunId/" + run._id)
              .then(function (data) {
                  console.log('data success');
                  console.log(data); // for browser console
                  $scope.run=data.data;
                  /* ara pintem al mapa */
                  vm.run={
                      name: "polyline",
                      path: []
                  };
                  for(var i=0; i<run.positions.length; i++)
                  {
                      vm.run.path.push([run.positions[i].lat, run.positions[i].long]);
                  }
                  $scope.centerPos.lat=run.positions[0].lat;
                  $scope.centerPos.long=run.positions[0].long;
                  $scope.indexPos=0;

              }, function (data, status) {
                  console.log('data error');
                  console.log(status);
                  console.log(data);
              });
        };
        $scope.indexPos=0;
        $scope.centerMap = function (pos) {
            console.log(pos);
            $scope.centerPos.lat=pos.lat;
            $scope.centerPos.long=pos.long;
            $scope.indexPos=$scope.indexPos +1;
            if($scope.indexPos>($scope.run.positions.length-1))
            {
                $scope.indexPos=0;
            }
            console.log($scope.indexPos);
        };

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

        $scope.nextPosition = function(){
            console.log($scope.indexPos);
            console.log($scope.run.positions[$scope.indexPos]);
            $scope.centerMap($scope.run.positions[$scope.indexPos]);
        };


        $http.get(urlapi + "runs/byUserId/" + $routeParams.userid)
          .then(function (data) {
              console.log('data success');
              console.log(data); // for browser console
              $scope.user=data.data;
              if($scope.user.runs)
              {
                  $scope.selectRun($scope.user.runs[$scope.user.runs.length-1]);
              }
          }, function (data, status) {
              console.log('data error');
              console.log(status);
              console.log(data);
          });
    });
