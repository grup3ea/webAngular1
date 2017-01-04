'use strict';
angular.module('myApp.sidenav', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sidenav', {
            templateUrl: 'views/sidenav.html',
            controller: 'SidenavCtrl'
        });
    }])
    .controller('SidenavCtrl', function ($scope, $http, $timeout, $window, $mdSidenav, $mdDialog) {
        if (localStorage.getItem("fs_web_token")) {
            console.log("user logged");
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        } else {
            if (($window.location == "#!/login") || ($window.location == "#!/signup")) {
                console.log("user not logged");
                $window.location = '/';
            }
        }
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            }
        }

        /* lu comú amb totes les views de la webapp
         posat aquí al menú */
        $scope.loginData = {};
        var pathImg = "img/essential/";

        $scope.options = [
            {
                title: "Dashboard",
                description: "description",
                link: "/dashboard",
                icon: pathImg + "stopwatch-4.png"
            },
            {
                title: "Profile",
                description: "description",
                link: "/"+$scope.storageuser.role +"/" +$scope.storageuser._id,
                icon: pathImg + "user.png"
            },
            {
                title: "Training",
                description: "description",
                link: "/training",
                icon: pathImg + "training.png"
            },
            {
                title: "Diet",
                description: "description",
                link: "/eating",
                icon: pathImg + "apple.png"
            },
            {
                title: "Settings",
                description: "description",
                link: "/settings",
                icon: pathImg + "settings.png"
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
        function newPostCtrl($scope, $mdDialog, $mdToast, $rootScope, $location, Upload, cloudinary) {

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
                url: urlapi + 'users/addPostToTimeline',
                method: "POST",
                data: {"newHistory": $scope.newPost}
            })
                .then(function (response) {
                  console.log(response);
                        /*localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));*/
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('New post added to your timeline')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                        $scope.postSended(response.data);
                    },
                    function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on updating user')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    });
          };/* end of sendNewPost */
        }/* end of newPostCtrl */
    });
