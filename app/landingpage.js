var urlapi = "http://147.83.7.158:3005/api/";
var app = angular.module('landingpageApp', []);
app.controller('landingpageCtrl', function ($scope, $http) {
    console.log("landingpage");
    $scope.trainers = {};
    $http.get(urlapi + 'trainers')
        .success(function (data) {
            console.log('data success');
            console.log(data);
            $scope.trainers = data;
            localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
        })
        .error(function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
        });
    $http.get(urlapi + 'chefs')
        .success(function (data) {
            console.log('data success');
            console.log(data);
            $scope.trainers = data;
            localStorage.setItem('fs_web_chefs', JSON.stringify($scope.chefs));
        })
        .error(function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
        });
    $http.get(urlapi + 'diets')
        .success(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            $scope.diets = data; // for UI
            localStorage.setItem('fs_web_diets', JSON.stringify($scope.diets));
        })
        .error(function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        })
        .then(function (result) {
        });
    $scope.giveInfo = function () {
        console.log('Giving Contact Info', $scope.contactdata);
        $http({
            url: urlapi + '/contacts',
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
