'use strict';
angular.module('myApp.sidenav', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sidenav', {
            templateUrl: 'views/sidenav.html',
            controller: 'SidenavCtrl'
        });
    }])
    .controller('SidenavCtrl', function ($scope, $http, $timeout, $window, $mdSidenav) {
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
                link: "/diet",
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
    });
