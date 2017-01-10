'use strict';
angular.module('myApp.editTrainer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editTrainer/:trainerid', {
            templateUrl: 'views/editTrainer/editTrainer.html',
            controller: 'EditTrainerCtrl'
        });
    }])
    .controller('EditTrainerCtrl', function ($scope, $http, $routeParams, $mdToast, $rootScope, $location, Upload, cloudinary) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "trainer") {
            window.location = "#!/dashboard";
        }
        $scope.trainer={};
        $http.get(urlapi + 'trainers/' + $routeParams.trainerid)
            .then(function (data) {
                $scope.trainer = data.data;
            }, function (data, status) {
            })
            .then(function (result) {
            });

        $scope.updateTrainer = function () {
            $http({
                url: urlapi + 'trainers/' + $routeParams.trainerid,
                method: "PUT",
                data: $scope.trainer
            })
                .then(function (response) {
                        $scope.trainer = response.data;
                        localStorage.setItem("fs_web_userdata", JSON.stringify(response.data));
                        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Trainer updated')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                        window.location="#!/user/" + $scope.storageuser._id;
                    },
                    function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on updating trainer')
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

            $scope.trainer.imgfileAvatar = file;
            if (!$scope.trainer.imgfileAvatar) return;
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
                  $scope.trainer.avatar=data.url;
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

            $scope.trainer.imgfileBackground = file;
            if (!$scope.trainer.imgfileBackground) return;
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
                  $scope.trainer.background=data.url;
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
