'use strict';


var urlapi="http://localhost:3005/api/";
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.login',
  'myApp.signup',
  'myApp.dashboard',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}]);
