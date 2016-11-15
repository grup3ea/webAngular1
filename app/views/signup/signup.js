'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'views/signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', function($scope, $http, $timeout, $window) {
  $scope.signupData={};

  $scope.doSignup = function() {
    $scope.signupData.role="client";
    console.log('Doing signup', $scope.signupData);
    if($scope.emptyParams($scope.signupData))
    {
      $http({
          url: urlapi + 'register',
          method: "POST",
          data: $scope.signupData
      })
      .then(function(response) {
              // success
              console.log("response: ");
              console.log(response.data);
              
              $timeout(function() {
                  $window.location="#";
              }, 1000);

      },
      function(response) { // optional
              // failed
            console.log('Username already taken');
      });
    }else{
      console.log('First complete all parameters');
    }

  };

  $scope.emptyParams = function(obj){
    if(obj.name==undefined)
    {
      return(false);
    }
    if(obj.password==undefined)
    {
      return(false);
    }
    if(obj.email==undefined)
    {
      return(false);
    }
    if(obj.avatar==undefined)
    {
      return(false);
    }
    return(true);
  };
  $scope.avatars=[
    "turtle",
    "cat",
    "toucan",
    "racoon",
    "tiger",
    "squirrel",
    "sheep",
    "penguin",
    "panda",
    "owl",
    "pelican",
    "whale",
    "snake",
    "mouse",
    "giraffe",
    "macaw",
    "lion",
    "llama",
    "kangaroo",
    "hen",
    "frog",
    "clown-fish",
    "chameleon",
    "octopus"
  ];
  $scope.avatarSelect = function(avat){
    console.log(avat);
    $scope.signupData.avatar=avat;
    //alert($scope.signupData.avatar);
  };
});
