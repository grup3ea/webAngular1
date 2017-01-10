'use strict';

angular.module('myApp.points', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/points/:userid', {
            templateUrl: 'views/points/points.html',
            controller: 'PointsCtrl'
        });
    }])

    .controller('PointsCtrl', function ($scope, $http, $routeParams, $filter) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user = {};
        $http.get(urlapi + 'users/' + $routeParams.userid + '/network')
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.user = data.data; // for UI

                /* aquí generem la data de la gràfica */
                console.log("generant data de gràfic");
                $scope.data=[];
                $scope.labels=[];
                var actualDay=$scope.user.points.history[0].date;
                var actualDayPoints=0;
                for(var i=0; i<$scope.user.points.history.length; i++)
                {
                    if($filter('date')(actualDay, 'dd.MM.y')==$filter('date')($scope.user.points.history[i].date, 'dd.MM.y'))
                    {
                        actualDayPoints=(+actualDayPoints) + (+$scope.user.points.history[i].value);
                        console.log("operació " + $scope.user.points.history[i].value + " --> " + "total: " + actualDayPoints);
                    }else{
                        $scope.data.push(actualDayPoints);
                        $scope.labels.push($filter('date')(actualDay, 'dd.MM.y'));
                        console.log("guardant dades del dia fins ara. canvi de dia.");
                        actualDayPoints=0;
                        actualDayPoints=(+actualDayPoints) + (+$scope.user.points.history[i].value);
                        actualDay=$scope.user.points.history[i].date;
                        console.log("dia nou: " + $filter('date')(actualDay, 'dd.MM.y'));
                        console.log("operació " + $scope.user.points.history[i].value + " --> " + "total: " + actualDayPoints);
                    }
                }
                $scope.data.push(actualDayPoints);
                $scope.labels.push($filter('date')(actualDay, 'dd.MM.y'));
                console.log("algoritme de generació de la data del gràfic completat");
                console.log($scope.data);
                console.log($scope.labels);
                /* end of generació de les dades de la gràfica */
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });

        $scope.orderByMe = function(x) {
          $scope.orderBy = x;
        };
    });
