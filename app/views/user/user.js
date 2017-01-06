'use strict';
angular.module('myApp.user', ['ngRoute', 'ngAnimate', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user/:userid', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])
    .controller('UserCtrl', function ($scope, $http, $routeParams, $mdToast, $mdDialog, toastr) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user = {};
        $http.get(urlapi + 'users/' + $routeParams.userid)
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



        $scope.showBackgroundImgDialog = function(ev) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/user/backgroundImg.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          });
        };
        $scope.showAvatarImgDialog = function(ev) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/user/avatarImg.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          });
        };
        function DialogController($scope, $mdDialog) {

          $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }



        //publication likes
        $scope.arrayObjectIndexOf = function(myArray, searchTerm, property) {
            if(myArray){
                for(var i = 0, len = myArray.length; i < len; i++) {
                    if (myArray[i] === searchTerm){
                        return i;
                    }
                }
            }
            return -1;
        };
        $scope.sendLikeToPublication = function(publication, index){
          console.log(index);
          console.log("like - " + publication.title);
            $http({
                url: urlapi + 'publications/'+publication._id+'/like',
                method: "POST"
            })
            .then(function (data) {
              console.log(data.data);
                    /*localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                    $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));*/
                    /*$mdToast.show(
                        $mdToast.simple()
                            .textContent('liked publication')
                            .position("bottom right")
                            .hideDelay(3000)
                    );*/
                    toastr.success('liked publication');
                    $scope.user = data.data;
                },
                function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Failed on posting like publication')
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                });
        };/* end of sendLikeToPublication */
        $scope.sendDislikeToPublication = function(publication, index){
          console.log(index);
          console.log("dislike - " + publication.title);
            $http({
                url: urlapi + 'publications/'+publication._id+'/dislike',
                method: "POST"
            })
            .then(function (data) {
              console.log(data.data);
                    /*localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                    $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));*/
                    /*$mdToast.show(
                        $mdToast.simple()
                            .textContent('disliked publication')
                            .position("bottom right")
                            .hideDelay(3000)
                    );*/
                    toastr.success('disliked publication');
                    $scope.user = data.data;
                },
                function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Failed on posting like publication')
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                });
        };/* end of sendDislikeToPublication */
    });
