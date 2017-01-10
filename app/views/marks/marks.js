'use strict';

angular.module('myApp.marks', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/marks/:userid', {
            templateUrl: 'views/marks/marks.html',
            controller: 'MarksCtrl'
        });
    }])

    .controller('MarksCtrl', function ($scope, $http, $routeParams, $filter) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user = {};
        $http.get(urlapi + 'users/' + $routeParams.userid + '/network')
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

        $scope.orderByMe = function(x) {
          $scope.orderBy = x;
        };

        $scope.data=[];
        $scope.labels=[];
        $scope.generateGraph = function(mark){
            $scope.markSelected=mark.title;
            /* aquí generem la data de la gràfica */
            console.log("generant data de gràfic");
            $scope.data=[];
            $scope.labels=[];
            for(var i=0; i<mark.days.length; i++)
            {
                $scope.data.push(mark.days[i].value);
                $scope.labels.push($filter('date')(mark.days[i].date, 'dd.MM.y'));
            }
            console.log("algoritme de generació de la data del gràfic completat");
            console.log($scope.data);
            console.log($scope.labels);
            /* end of generació de les dades de la gràfica */
        };
    });
