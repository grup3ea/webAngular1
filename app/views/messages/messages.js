'use strict';

angular.module('myApp.messages', ['ngRoute', 'chart.js', 'ngAnimate', 'toastr', 'luegg.directives'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/messages', {
            templateUrl: 'views/messages/messages.html',
            controller: 'MessagesCtrl'
        });
    }])

    .controller('MessagesCtrl', function ($scope, $http, $routeParams, $filter,
                                    toastr, $route) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.selectedConversation={};
        $scope.indexSelectedConversation;
        $scope.selectConversation=function(conv, indexConv){
            console.log(conv);
            $scope.selectedConversation=conv;
            $scope.indexSelectedConversation=indexConv;
        };

        $scope.sendMessage = function(){
            if(($scope.newMessage.message!="")&&($scope.newMessage.message))
            {//comprovem que realment hagi escrit missatge
                $http({
                    url: urlapi + 'conversations/' + $scope.selectedConversation._id,
                    method: "POST",
                    data: $scope.newMessage
                })
                .then(function (data) {
                    console.log(data);
                    //toastr.success('message sent');
                    $scope.conversations = data.data; // for UI
                    $scope.selectedConversation=$scope.conversations[$scope.indexSelectedConversation];
                    $scope.newMessage={};
                },
                function () {
                    toastr.error('Failed on sending message');
                });
            }
        };/* end of sendNewMessage */


        $scope.conversations = [];
        $scope.getConversations=function(){
            $http.get(urlapi + 'conversations')
            .then(function (data) {
                console.log(Date());
                console.log('data success');
                console.log(data); // for browser console
                $scope.conversations = data.data; // for UI
                $scope.selectedConversation=$scope.conversations[$scope.indexSelectedConversation];
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
        };

        if(window.location.hash=="#!/messages")
        {
            console.log("messages page");
            $scope.timer = setInterval(function(){
                if(window.location.hash=="#!/messages")
                {
                    $scope.getConversations();
                }//s'ha d'acavar d'afinar això, ara cada cop que entres a la pàgina de messages, s'afegeix un nou timer als que ja teniem
            }, 3000);//cada tres segons
        }else{
            console.log("not messages page");
        }

        $scope.getConversations();
    });
