'use strict';

angular.module('myApp.clients', ['ngRoute', 'chart.js', 'ngAnimate'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/clients', {
            templateUrl: 'views/clients/clients.html',
            controller: 'ClientsCtrl'
        });
    }])

    .controller('ClientsCtrl', function ($scope, $http, $routeParams,
        $mdToast, $mdDialog, $window, $filter) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $http.get(urlapi + 'trainers/' + $scope.storageuser._id)
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                //$scope.trainers = data.data; // for UI
                //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
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
        $scope.acceptPetition = function (ev, petitionid) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Accept this petition?')
                .textContent('If you accept, this client will appear in your clients list, and you will be able to create routines for this client.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Confirm')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    url: urlapi + 'trainers/acceptClientPetition',
                    method: "POST",
                    data: {"petitionid": petitionid}
                })
                    .then(function (response) {
                            // success
                            console.log("response: ");
                            console.log(response.data);
                            $scope.storageuser = response.data;
                            //$window.location = "#!/routine/"+response.data._id;
                        },
                        function (response) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Failed on generating new routine')
                                    .position("bottom right")
                                    .hideDelay(3000)
                            );
                        });
            }, function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Operation canceled')
                        .position("bottom right")
                        .hideDelay(3000)
                );
            });
        };
    });
