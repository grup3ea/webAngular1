'use strict';
angular.module('myApp.dashboard', ['ngRoute', 'ui.calendar', 'chart.js'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', function ($scope, $compile, uiCalendarConfig,
                                           $http, $window, $mdDialog, $mdToast,
                                            $filter) {
        if (localStorage.getItem('fs_web_token')) {// adding token to the headers
            console.log("user logged");
            /*$http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
             //el .common serveix per als gets
             $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');*/
        } else {
            console.log("no logged");
            $window.location = "#!/login";
        }
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        
        $scope.data=[];
        $scope.labels=[];
        /*
         /chart
         */
        if ($scope.storageuser.role == "user") {
            /* SECCiÓ USER */
            //console.log("agafant l'user del server " + $scope.storageuser.name + $scope.storageuser._id);
            $http.get(urlapi + 'users/' + $scope.storageuser._id)
                .then(function (data) {
                    console.log('data success');
                    console.log(data); // for browser console
                    //$scope.trainers = data.data; // for UI
                    //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
                    localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                    $scope.storageuser = data.data;

                    /* aquí generem la data de la gràfica */
                    console.log("generant data de gràfic");
                    $scope.data=[];
                    $scope.labels=[];
                    var actualDay=$scope.storageuser.points.history[0].date;
                    var actualDayPoints=0;
                    for(var i=0; i<$scope.storageuser.points.history.length; i++)
                    {
                        if($filter('date')(actualDay, 'dd.MM.y')==$filter('date')($scope.storageuser.points.history[i].date, 'dd.MM.y'))
                        {
                            actualDayPoints=(+actualDayPoints) + (+$scope.storageuser.points.history[i].value);
                            console.log("operació " + $scope.storageuser.points.history[i].value + " --> " + "total: " + actualDayPoints);
                        }else{
                            $scope.data.push(actualDayPoints);
                            $scope.labels.push($filter('date')(actualDay, 'dd.MM.y'));
                            console.log("guardant dades del dia fins ara. canvi de dia.");
                            actualDayPoints=0;
                            actualDayPoints=(+actualDayPoints) + (+$scope.storageuser.points.history[i].value);
                            actualDay=$scope.storageuser.points.history[i].date;
                            console.log("dia nou: " + $filter('date')(actualDay, 'dd.MM.y'));
                            console.log("operació " + $scope.storageuser.points.history[i].value + " --> " + "total: " + actualDayPoints);
                        }
                    }
                    $scope.data.push(actualDayPoints);
                    $scope.labels.push($filter('date')(actualDay, 'dd.MM.y'));
                    console.log("algoritme de generació de la data del gràfic completat");
                    console.log($scope.data);
                    console.log($scope.labels);
                    /* end of generació de les dades de la gràfica */
                }, function (data, status) {
                    console.log('data error');
                    console.log(status);
                    console.log(data);
                })
                .then(function (result) {
                    //users = result.data;
                });
            /* end SECCIÓ USER */
        } else if ($scope.storageuser.role == "trainer") {
            /* SECCiÓ TRAINER */
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
            /* end SECCIÓ TRAINER */
        } else if ($scope.storageuser.role == "chef") {
            /* SECCiÓ CHEF */
            $http.get(urlapi + 'chefs/' + $scope.storageuser._id)
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
            //newRoutine dialog
            $scope.createDiet = function (ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.prompt()
                    .title('Add new diet')
                    .textContent('Name the diet')
                    .placeholder('Diet name')
                    .ariaLabel('Dog name')
                    .initialValue('')
                    .targetEvent(ev)
                    .ok('Create Diet')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function (result) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Creating new diet: ' + result)
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                    //POST NEW ROUTINE
                    $http({
                        url: urlapi + 'diets',
                        method: "POST",
                        data: {"title": result}
                    })
                        .then(function (response) {
                                // success
                                console.log("response: ");
                                console.log(response.data);
                                $window.location = "#!/editDiet/" + response.data._id;
                            },
                            function (response) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('Failed on generating new diet')
                                        .position("bottom right")
                                        .hideDelay(3000)
                                );
                            });
                }, function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('New Diet canceled')
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                });
            };
            /* end SECCIÓ CHEF */
        }
    });
