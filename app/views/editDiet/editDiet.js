'use strict';
angular.module('myApp.editDiet', ['ngRoute', 'ngFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editDiet/:dietid', {
            templateUrl: 'views/editDiet/editDiet.html',
            controller: 'EditDietCtrl'
        });
    }])
    .controller('EditDietCtrl', function ($scope, $http, $routeParams, $mdToast, $rootScope, $location, Upload, cloudinary) {
        /*if (localStorage.getItem('fs_web_token')) {// adding token to the headers
         $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
         //el .common serveix per als gets
         $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
         }*/
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        if ($scope.storageuser.role != "chef") {
            window.location = "#!/dashboard";
        }
        $scope.diet = {};
        $http.get(urlapi + 'diets/' + $routeParams.dietid)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.diet = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });

        $scope.meals = [];
        $scope.addMeal = function () {
            $scope.meals.push({
                title: '',
                submeals: []
            });
        };
        $scope.delMeal = function (mealToDel) {
            var index = $scope.meals.indexOf(mealToDel);
            $scope.meals.splice(index, 1);
        };
        $scope.addSubmeal = function (currentMeal) {
            var index = $scope.meals.indexOf(currentMeal);
            $scope.meals[index].submeals.push({
                title: '',
                description: '',
                amount: {
                  unit: '',
                  quantity: ''
                },
                nutritional: {
                  kcal: '',
                  proteins: '',
                  carbohidrates: '',
                  fats: '',
                  vitamins: ''
                }
            });
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
                    "meals": $scope.meals
                }
            };
            console.log(newd);
            $http({
                url: urlapi + 'diets/' + $routeParams.dietid + '/days',
                method: "POST",
                data: newd
            })
                .then(function (response) {
                        // success
                        console.log("day added, response: ");
                        console.log(response.data);
                        $scope.diet = response.data;
                        $scope.newDay = {};
                        $scope.meals = [];
                        //$window.location = "#!/routine/"+response._id;
                    },
                    function (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Failed on generating new day for the diet')
                                .position("bottom right")
                                .hideDelay(3000)
                        );
                    });
        };

    });
