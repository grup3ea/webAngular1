'use strict';

angular.module('myApp.network', ['ngRoute', 'ngAnimate', 'toastr'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/network', {
            templateUrl: 'views/network/network.html',
            controller: 'NetworkCtrl'
        });
    }])

    .controller('NetworkCtrl', function ($scope, $http, $mdDialog, toastr, $route) {
      $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

      $http.get(urlapi + 'users/'+ $scope.storageuser._id + '/network')
          .then(function (data) {
              console.log('data success');
              console.log(data); // for browser console
              //$scope.trainers = data.data; // for UI
              //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
              localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
              $scope.storageuser=data.data;
          }, function (data, status) {
              console.log('data error');
              console.log(status);
              console.log(data);
          })
          .then(function (result) {
              //users = result.data;
          });

      $scope.newsfeed=[];
      $http.get(urlapi + 'publications/newsfeed')
        .then(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            $scope.newsfeed=data.data;
        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
            //users = result.data;
        });



        $scope.showImgComplete = function(ev, urlimg) {
          console.log(urlimg);
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/imgComplete.tmpl.html',
            locals: {
              urlImg: urlimg
            },
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          });
        };
        function DialogController($scope, $mdDialog, locals) {
          console.log(locals);
          $scope.urlImg=locals.urlImg;
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
        $scope.arrayObjectIndexOf = function(myArray, searchTerm) {
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
                    toastr.success('liked publication');
                    for(var i=0; i<$scope.newsfeed.length; i++)
                    {
                        if($scope.newsfeed[i]._id==data.data._id)
                        {//dins de la publication en concret
                            $scope.newsfeed[i]=data.data;
                        }
                    }
                },
                function () {
                    toastr.error('Failed on posting like publication');
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
                    toastr.success('disliked publication');
                    for(var i=0; i<$scope.newsfeed.length; i++)
                    {
                        if($scope.newsfeed[i]._id==data.data._id)
                        {//dins de la publication en concret
                            $scope.newsfeed[i]=data.data;
                        }
                    }
                },
                function () {

                      toastr.error('Failed on posting dislike publication');
                });
        };/* end of sendDislikeToPublication */



        $scope.deletePublication = function (ev, publicationid) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Delete this publication?')
                .textContent('Are you sure?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes, delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    url: urlapi + 'publications/' + publicationid,
                    method: "Delete"
                })
                    .then(function (response) {
                            // success
                            console.log("response: ");
                            console.log(response.data);
                            toastr.success('Publication deleted!');
                            $route.reload();
                        },
                        function (response) {
                            toastr.error('Failed on deleting publication');
                        });
            }, function () {
                toastr.info('Operation canceled');
            });
        };/* end of delete publication */


        $scope.orderByMe = function(x) {
          $scope.orderBy = x;
        };

        /* suggestions */
        $scope.suggestions=[];
        $http.get(urlapi + 'users/'+ $scope.storageuser._id + '/suggestions')
            .then(function (data) {
                console.log('data success');
                console.log(data);
                $scope.suggestions=data.data;
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            });
        /* followers following system */
        $scope.doFollow = function(user){
            $http({
                url: urlapi + 'users/follow',
                method: "POST",
                data: {userid: user._id}
            })
            .then(function (data) {
                console.log(data.data);
                toastr.info("User: " + user.name + " followed");
                $route.reload();
            },
            function () {
                  toastr.error('Failed on following user');
            });
        };
    });
