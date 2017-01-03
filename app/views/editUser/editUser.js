'use strict';
angular.module('myApp.editUser', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editUser/:userid', {
            templateUrl: 'views/editUser/editUser.html',
            controller: 'EditUserCtrl'
        });
    }])
    .controller('EditUserCtrl', function ($scope, $http, $routeParams, $mdToast, $rootScope, $location, Upload, cloudinary) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "user") {
            window.location = "#!/dashboard";
        };
        $scope.user={};
        $http.get(urlapi + 'users/' + $routeParams.userid)
            .then(function (data) {
                $scope.user = data.data;
                localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
            }, function (data, status) {
            })
            .then(function (result) {
            });

        $scope.updateUser = function () {
            $http({
                url: urlapi + 'users/' + $routeParams.userid,
                method: "PUT",
                data: $scope.user
            })
                .then(function (response) {
                  console.log(response);
                        $scope.user = response.data;
                        localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('User updated')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                        window.location="#!/user/" + $scope.storageuser._id;
                    },
                    function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on updating user')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    });
        };

        /* cloudinary */
          $scope.uploadFileAvatar = function(file, index){
            console.log(index);
            var d = new Date();
            $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

            $scope.user.imgfileAvatar = file;
            if (!$scope.user.imgfileAvatar) return;
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
                  $scope.user.avatar=data.url;
                  $rootScope.photos = $rootScope.photos || [];
                  data.context = {custom: {photo: $scope.title}};
                  file.result = data;
                  $rootScope.photos.push(data);
                }).error(function (data, status, headers, config) {
                  file.result = data;
                });
              }
          };
          $scope.uploadFileBackground = function(file, index){
            console.log(index);
            var d = new Date();
            $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

            $scope.user.imgfileBackground = file;
            if (!$scope.user.imgfileBackground) return;
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
                  $scope.user.background=data.url;
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
    });
