'use strict';
angular.module('myApp.sidenav', ['ngRoute', 'ngAnimate', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sidenav', {
            templateUrl: 'views/sidenav.html',
            controller: 'SidenavCtrl'
        });
    }])
    .controller('SidenavCtrl', function ($scope, $http, $timeout, $window, $mdSidenav, $mdDialog, toastr, $route) {
        if (localStorage.getItem("fs_web_token")) {
            // USER LOGUEJAT
            console.log("user logged");
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

            /* lu comú amb totes les views de la webapp
             posat aquí al menú */
            $scope.loginData = {};
            var pathImg = "img/essential/";
            var sidenavImg="img/sidenav/";
            $scope.options = [
                {
                    title: "Dashboard",
                    description: "description",
                    link: "/dashboard",
                    icon: sidenavImg + "dashboard.png"
                },
                {
                    title: "Profile",
                    description: "description",
                    link: "/"+$scope.storageuser.role +"/" +$scope.storageuser._id,
                    icon: sidenavImg + "profile.png"
                },
                {
                    title: "Network",
                    description: "description",
                    link: "/network",
                    icon: sidenavImg + "network.png"
                },
                {
                    title: "Training",
                    description: "description",
                    link: "/training",
                    icon: sidenavImg + "training.png"
                },
                {
                    title: "Diet",
                    description: "description",
                    link: "/eating",
                    icon: sidenavImg + "diet.png"
                },
                {
                    title: "Settings",
                    description: "description",
                    link: "/settings",
                    icon: sidenavImg + "settings.png"
                }
            ];
            console.log($scope.options);
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
