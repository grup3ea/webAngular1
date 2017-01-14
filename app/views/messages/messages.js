'use strict';

angular.module('myApp.messages', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/messages', {
            templateUrl: 'views/messages/messages.html',
            controller: 'MessagesCtrl'
        });
    }])

    .controller('MessagesCtrl', function ($scope, $http, $routeParams, $filter) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.conversations = {};
        $http.get(urlapi + 'conversations')
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.conversations = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });

        $scope.orderByMe = function(x) {
          $scope.orderBy = x;
        };
        $scope.selectedConversation={};
        $scope.selectConversation=function(conv){
            console.log(conv);
            $scope.selectedConversation=conv;
        };
    });
