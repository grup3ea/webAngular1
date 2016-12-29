'use strict';


var urlapi = "http://localhost:3005/api/";
//var urlapi="http://147.83.7.158:3005/api/";

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'cloudinary',
    'ngMaterial',
    'myApp.sidenav',
    'myApp.main',
    'myApp.login',
    'myApp.logout',
    'myApp.signup',
    'myApp.dashboard',
    'myApp.routine',
    'myApp.trainer',
    'myApp.editTrainer',
    'myApp.editUser',
    'myApp.editRoutine',
    'myApp.user',
    'myApp.client',
    'myApp.userDiet',
    'myApp.diet',
    'myApp.editDiet',
    'myApp.training',
    'myApp.settings',
    'ui.calendar'
]).config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    if((localStorage.getItem("fs_web_token"))&&(JSON.parse(localStorage.getItem("fs_web_userdata"))!="null")&&(JSON.parse(localStorage.getItem("fs_web_userdata"))!=null))
    {
      console.log(window.location.hash);
      if(window.location.hash=="#!/login")
      {
        window.location='#!/dashboard';
      }

      $routeProvider.otherwise({redirectTo: '/dashboard'});
    }else{
      if((window.location!="#!/login")||(window.location!="#!/signup"))
      {
        console.log("app, user no logged");

        localStorage.removeItem("fs_web_token");
        localStorage.removeItem("fs_web_userdata");
        window.location="#!/login";
        $routeProvider.otherwise({redirectTo: '/login'});
      }
    }
    //$httpProvider.interceptors.push('httpInterceptor');
}])
.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "dr9eawlpy")
      .set("upload_preset", "wbb0h4me");
}])
.factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
  return {
    request: function(config) {
      return config;
    },

    requestError: function(config) {
      return config;
    },

    response: function(res) {
      return res;
    },

    responseError: function(res) {
      return res;
    }
  }
})
.factory('api', function ($http) {
	return {
		init: function () {
      $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("fs_web_token");
      $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("fs_web_token");
		}
	};
})
.run(function (api) {
	api.init();
});
