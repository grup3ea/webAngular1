'use strict';
angular.module('myApp.editRoutine', ['ngRoute', 'ngFileUpload', 'ngAnimate', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editRoutine/:routineid', {
            templateUrl: 'views/editRoutine/editRoutine.html',
            controller: 'EditRoutineCtrl'
        });
    }])
    .controller('EditRoutineCtrl', function ($scope, $http, $routeParams, $mdToast,
        $rootScope, $location, Upload, cloudinary, $mdDialog, toastr) {
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
        $scope.deleteRoutine=function(ev){
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Delete this routine?')
                .textContent('Are you sure?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes, delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    url: urlapi + 'routines/' + $scope.routine._id,
                    method: "Delete"
                })
                    .then(function (response) {
                            // success
                            console.log("response: ");
                            console.log(response.data);
                            toastr.success('Routine deleted!');
                            window.location="#!/clients";
                        },
                        function (response) {
                            toastr.error('Failed on deleting routine');
                        });
            }, function () {
                toastr.info('Operation canceled');
            });
        };





        /* cloudinary */
          $scope.uploadFile = function(file, index){
            console.log(index);
            var d = new Date();
            $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

            $scope.exercises[index].imgfile = file;
            if (!$scope.exercises[index].imgfile) return;
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
                  $scope.exercises[index].img=data.url;
                  $rootScope.photos = $rootScope.photos || [];
                  data.context = {custom: {photo: $scope.title}};
                  file.result = data;
                  $rootScope.photos.push(data);
                }).error(function (data, status, headers, config) {
                  file.result = data;
                });
              }
          };/* end of cloudinary */
    });
