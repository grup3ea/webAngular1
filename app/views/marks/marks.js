'use strict';

angular.module('myApp.marks', ['ngRoute', 'chart.js', 'ngAnimate', 'toastr'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/marks/:userid', {
            templateUrl: 'views/marks/marks.html',
            controller: 'MarksCtrl'
        });
    }])

    .controller('MarksCtrl', function ($scope, $http, $routeParams, $filter,
                                    $mdDialog, toastr, $route) {
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





        $scope.showNewMarkDialog = function(ev) {
          $mdDialog.show({
            controller: newMarkCtrl,
            templateUrl: 'views/marks/newmark.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function(data) {
          }, function() {
            //
          });
        };
        function newMarkCtrl($scope, $mdDialog, $rootScope, $location, Upload, cloudinary, toastr) {

            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.markSended = function(data) {
                $mdDialog.hide(data);
            };

            $scope.sendNewMark = function(){
                $http({
                    url: urlapi + 'users/newMark',
                    method: "POST",
                    data: $scope.newMark
                })
                .then(function (response) {
                    console.log(response);
                    /*localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                    $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));*/
                    toastr.success('New mark added to your marks');
                    $scope.markSended(response.data);

                    $route.reload();
                },
                function () {
                    toastr.error('Failed on adding mark to your marks');
                });
            };/* end of sendNewMark */
        }/* end of newMarkCtrl */
        var markWhereAddingDay;
        $scope.showAddDayToMarkDialog = function(ev, mark) {
            markWhereAddingDay=mark;
          $mdDialog.show({
            controller: newAddDayToMarkCtrl,
            templateUrl: 'views/marks/adddaytomark.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function(data) {
          }, function() {
            //
          });
        };
        function newAddDayToMarkCtrl($scope, $mdDialog, $rootScope, $location, Upload, cloudinary, toastr) {

          $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.markSended = function(data) {
            $mdDialog.hide(data);
          };

            $scope.sendAddDayToMark = function(){
                $http({
                    url: urlapi + 'users/marks/' + markWhereAddingDay._id + '/addDayToMark',
                    method: "POST",
                    data: $scope.newDay
                })
                .then(function (response) {
                  console.log(response);
                        /*localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));*/
                        toastr.success('New mark added to your marks');
                        $scope.markSended(response.data);

                        $route.reload();
                    },
                    function () {
                        toastr.error('Failed on adding mark to your marks');
                    });
          };/* end of sendNewPost */
        }/* end of newPostCtrl */





        $scope.deleteMark=function(ev, mark){
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Delete this mark?')
                .textContent('Are you sure?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes, delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    url: urlapi + 'users/marks/' + mark._id,
                    method: "Delete"
                })
                    .then(function (response) {
                            // success
                            console.log("response: ");
                            console.log(response.data);
                            toastr.success('Mark deleted!');
                            $route.reload();
                        },
                        function (response) {
                            toastr.error('Failed on deleting mark');
                        });
            }, function () {
                toastr.info('Operation canceled');
            });
        };
    });
