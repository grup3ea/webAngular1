'use strict';
angular.module('myApp.user', ['ngRoute', 'ngAnimate', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user/:userid', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])
    .controller('UserCtrl', function ($scope, $http, $routeParams, $mdDialog, toastr, $route, $filter, $window) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.user = {};
        $http.get(urlapi + 'users/' + $routeParams.userid)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.user = data.data; // for UI
                if($scope.user._id==$scope.storageuser._id)
                {
                  localStorage.setItem("fs_web_userdata", JSON.stringify($scope.user));
                  $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
                }
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
        $scope.showImgComplete = function(ev, urlimg) {
          console.log(urlimg);
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/user/imgComplete.tmpl.html',
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
                    for(var i=0; i<$scope.user.publications.length; i++)
                    {
                        if($scope.user.publications[i]._id==data.data._id)
                        {//dins de la publication en concret
                            $scope.user.publications[i]=data.data;
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
                    for(var i=0; i<$scope.user.publications.length; i++)
                    {
                        if($scope.user.publications[i]._id==data.data._id)
                        {//dins de la publication en concret
                            $scope.user.publications[i]=data.data;
                        }
                    }
                },
                function () {

                      toastr.error('Failed on posting dislike publication');
                });
        };/* end of sendDislikeToPublication */


        /* followers following system */
        $scope.doFollow = function(){
            $http({
                url: urlapi + 'users/follow',
                method: "POST",
                data: {userid: $scope.user._id}
            })
            .then(function (data) {
                console.log(data.data);
                $scope.user = data.data;
                $route.reload();
            },
            function () {

                  toastr.error('Failed on following user');
            });
        };
        $scope.doUnfollow = function(){
            $http({
                url: urlapi + 'users/unfollow',
                method: "POST",
                data: {userid: $scope.user._id}
            })
            .then(function (data) {
                console.log(data.data);
                $scope.user = data.data;
                $route.reload();
            },
            function () {

                  toastr.error('Failed on unfollowing user');
            });
        };



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



        //TRAINER
        $scope.valorate = function () {
            var valoration = {
                message: user.valorations.message,
                value: user.valorations.value
            }
            $http({
                url: urlapi + 'users/valorateTrainer/' + $scope.user._id,
                method: "POST",
                data: valoration
            }).then(function (data) {
                    console.log(data.data);
                    $scope.user = data.data;
                },
                function () {
                    toastr.error('Failed on valorating trainer');
                });
        };

        $scope.sendPetition = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.prompt()
            .title('Ask for routine')
            .textContent('Describe the petition')
            .placeholder('Hi, I want a routine to get prepared for an Ironman')
            .ariaLabel('Dog name')
            .initialValue('')
            .targetEvent(ev)
            .ok('Send Petition')
            .cancel('Cancel');

          $mdDialog.show(confirm).then(function(result) {

              //POST PETITION
              $http({
                  url: urlapi + 'users/sendPetitionToTrainer/' + $scope.user._id,
                  method: "POST",
                  data: {"message": result}
              })
              .then(function (response) {
                  // success
                  console.log("response: ");
                  console.log(response.data);
                  $window.location = "#!/training";
              },
              function (response) {
                  toastr.error('Failed on generating new petition');
              });
          }, function() {
              toastr.info('Petition canceled');
          });
        };//end of send petition

        $scope.sendMessage = function(ev) {
            $http({
                url: urlapi + 'conversations',
                method: "POST",
                data: {"userB": $routeParams.userid}
            })
            .then(function (response) {
                // success
                console.log("response: ");
                console.log(response.data);
                $window.location = "#!/messages";
            },
            function (response) {
                toastr.error('Failed on generating new petition');
            });
        };//end of send message
    });
