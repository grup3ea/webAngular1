'use strict';
angular.module('myApp.editRoutine', ['ngRoute', 'ngFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editRoutine/:routineid', {
            templateUrl: 'views/editRoutine/editRoutine.html',
            controller: 'EditRoutineCtrl'
        });
    }])
    .controller('EditRoutineCtrl', function ($scope, $http, $routeParams, $mdToast, $rootScope, $location, Upload, cloudinary) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
         $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
         //el .common serveix per als gets
         $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
         }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "trainer") {
            window.location = "#!/dashboard";
        }
        $scope.routine = {};
        $http.get(urlapi + 'routines/' + $routeParams.routineid)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.routine = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
        $scope.exercises = [{}];
        $scope.addExercise = function () {
            $scope.exercises.push({
                title: '',
                description: '',
                img: '',
                weight: '',
                distance: '',
                reps: '',
                series: '',
                imgfile: {}
            });
        };
        $scope.delExercise = function (exerciseToDel) {
            var index = $scope.exercises.indexOf(exerciseToDel);
            $scope.exercises.splice(index, 1);
        };
        $scope.addDay = function () {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Adding new day')
                    .position("bottom right")
                    .hideDelay(3000)
            );
            var newd = {
                "day": {
                    "title": $scope.newDay.title,
                    "description": $scope.newDay.description,
                    "exercises": $scope.exercises
                }
            };
            console.log(newd);
            $http({
                url: urlapi + 'routines/' + $routeParams.routineid + '/days',
                method: "POST",
                data: newd
            })
                .then(function (response) {
                        // success
                        console.log("day added, response: ");
                        console.log(response.data);
                        $scope.routine = response.data;
                        $scope.newDay = {};
                        $scope.exercises = [{
                            title: '',
                            description: '',
                            img: '',
                            weight: '',
                            distance: '',
                            reps: '',
                            series: ''
                        }];
                        //$window.location = "#!/routine/"+response._id;
                    },
                    function (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on generating new routine')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    });
        };





        /* cloudinary */
          $scope.uploadFiles = function(files){

            var d = new Date();
            $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function(file){
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
                  $rootScope.photos = $rootScope.photos || [];
                  data.context = {custom: {photo: $scope.title}};
                  file.result = data;
                  $rootScope.photos.push(data);
                }).error(function (data, status, headers, config) {
                  file.result = data;
                });
              }
            });
          };
    });
