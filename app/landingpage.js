//var urlapi = "http://localhost:3005/api/";
var urlapi="http://147.83.7.158:3005/api/";
var app = angular.module('landingpageApp', []);
app.controller('landingpageCtrl', function ($scope, $http) {
    console.log("landingpage");
    $scope.trainers = {};
    $http.get(urlapi + 'trainers')
        .then(function (data) {
                console.log('data success');
                console.log(data);
                $scope.trainers = data.data;
                localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
            }
            , function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            });
    $http.get(urlapi + 'chefs')
        .then(function (data) {
                console.log('data success');
                console.log(data);
                $scope.chefs = data.data;
                localStorage.setItem('fs_web_chefs', JSON.stringify($scope.chefs));
            }
            , function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            });
    $http.get(urlapi + 'diets')
        .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.diets = data.data; // for UI
                localStorage.setItem('fs_web_diets', JSON.stringify($scope.diets));
            }
            , function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            });
    $scope.giveInfo = function () {
        console.log('Giving Contact Info', $scope.contactdata);
        $http({
            url: urlapi + 'contacts',
            method: "POST",
            data: $scope.contactdata
        })
            .then(function (response) {
                    console.log("response: ");
                    console.log(response.data);
                    if (response.data.success == true) {
                        window.location.reload();
                    } else {
                        console.log("Giving Contact Info failed");
                    }
                }
            )
    }
});
