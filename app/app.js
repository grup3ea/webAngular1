'use strict';


var urlapi = "http://localhost:3005/api/";
//var urlapi="http://147.83.7.158:3005/api/";

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.sidenav',
    'myApp.main',
    'myApp.login',
    'myApp.logout',
    'myApp.signup',
    'myApp.dashboard',
    'myApp.diet',
    'myApp.training',
    'myApp.settings',
    'ui.calendar'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    if(localStorage.getItem("fs_web_token"))
    {
      $routeProvider.otherwise({redirectTo: '/dashboard'});
    }else{
      $routeProvider.otherwise({redirectTo: '/login'});
    }
}]);
