'use strict';
angular.module('myApp.sidenav', ['ngRoute', 'ngAnimate', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sidenav', {
            templateUrl: 'views/sidenav.html',
            controller: 'SidenavCtrl'
        });
    }])
    .controller('SidenavCtrl', function ($scope, $http, $timeout, $window,
                                        $mdSidenav, $mdDialog, toastr, $route) {
        if (localStorage.getItem("fs_web_token")) {
            // USER LOGUEJAT
            console.log("user logged");
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
            $http.get(urlapi + 'users/' + $scope.storageuser._id)
                .then(function (data) {
                    localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                    $scope.storageuser = data.data;
                }, function (data, status) {
                    console.log('data error');
                    console.log(status);
                    console.log(data);
                })
                .then(function (result) {
                    //users = result.data;
                });

            $scope.timer = setInterval(function(){
                $http.get(urlapi + "notificationsNumber")//fem un get de les notificacions pendents
                  .then(function (data) {
                      console.log('notificationsNumber data success');
                      console.log(data); // for browser console
                      if($scope.storageuser.notifications<data.data)
                      {
                          toastr.info("new notification!");
                      }
                      $scope.storageuser.pendentNotificationsNumber=data.data;
                  }, function (data, status) {
                      console.log('data error');
                      console.log(status);
                      console.log(data);
                  })
                  .then(function (result) {
                      //users = result.data;
                  });
            }, 10000);//cada deu o trenta segons

            /* lu comú amb totes les views de la webapp
             posat aquí al menú */
            $scope.loginData = {};
            $scope.logout = function () {
                //EL LOGOUT NO VA A LA API, per això aquí està comentat el post
                /*$http({
                 url: urlapi + 'logout',
                 method: "POST",
                 data: {"logout":"true"}
                 })
                 .then(function (response) {
                 // success
                 console.log("response: ");
                 console.log(response.data);
                 if (response.data.success == true) {*/
                localStorage.removeItem("fs_web_token");
                localStorage.removeItem("fs_web_userdata");
                $window.location = "landingpage.html";
                /*} else {
                 console.log("login failed");
                 }
                 },
                 function (response) { // optional
                 // failed
                 console.log(response);
                 });*/
            };



            $scope.showNewPostDialog = function(ev) {
              $mdDialog.show({
                controller: newPostCtrl,
                templateUrl: 'views/newpost.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
              })
              .then(function(data) {
                localStorage.setItem("fs_web_userdata", JSON.stringify(data));
                $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
                console.log("newpost dialog closed");
                console.log($scope.storageuser);
              }, function() {
                //
              });
            };
            function newPostCtrl($scope, $mdDialog, $rootScope, $location, Upload, cloudinary, toastr) {

              $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

              $scope.newPost={};

              $scope.hide = function() {
                $mdDialog.hide();
              };

              $scope.cancel = function() {
                $mdDialog.cancel();
              };

              $scope.postSended = function(data) {
                $mdDialog.hide(data);
              };


              /* cloudinary */
                $scope.uploadFileAvatar = function(file, index){
                  console.log(index);
                  var d = new Date();
                  $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

                  $scope.newPost.imgfile = file;
                  if (!$scope.newPost.imgfile) return;
                    if (file && !file.$error) {
                      console.log(file);
                      file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                          upload_preset: cloudinary.config().upload_preset,
                          tags: 'myphotoalbum',
                          context: 'photo=' + $scope.title,
                          file: file
                        },
                        headers: {
                         'X-Access-Token': undefined
                        },
                      }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                      }).success(function (data, status, headers, config) {
                        console.log(data.url);
                        $scope.newPost.photo=data.url;
                        $rootScope.photos = $rootScope.photos || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        $rootScope.photos.push(data);
                      }).error(function (data, status, headers, config) {
                        file.result = data;
                      });
                    }
                };
                /* end of cloudinary */
                $scope.sendNewPost = function(){
                    $http({
                        url: urlapi + 'publications',
                        method: "POST",
                        data: $scope.newPost
                    })
                    .then(function (response) {
                      console.log(response);
                            /*localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));*/
                            toastr.success('New post added to your timeline');
                            $scope.postSended(response.data);

                            $route.reload();
                        },
                        function () {
                            toastr.error('Failed on adding post to your timeline');
                        });
              };/* end of sendNewPost */
            }/* end of newPostCtrl */


            /* searchbox */
            $scope.searchstring="";
            $scope.goSearch = function(){
              $window.location = "#!/search/"+ $scope.searchstring;
            };/* end of doSearch */
            /* /searchbox */
        } else {
            // USER NO LOGUEJAT
            if (($window.location == "#!/login") || ($window.location == "#!/signup")) {
                console.log("user not logged");
                $window.location = '/';
            }
            $scope.storageuser=null;
        }

    });
