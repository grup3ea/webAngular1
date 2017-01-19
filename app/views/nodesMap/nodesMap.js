'use strict';

var nodes, edges, container;
var options = {
  layout:{
    improvedLayout: false
  }
};

angular.module('myApp.nodesMap', ['ngRoute', 'chart.js', 'ngAnimate', 'toastr'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/nodesMap', {
        templateUrl: 'views/nodesMap/nodesMap.html',
        controller: 'NodesMapCtrl'
    });
}])

.controller('NodesMapCtrl', function ($scope, $http, $routeParams, $filter,
                                $mdDialog, toastr, $route) {
    $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

    $scope.users={};
    $http.get(urlapi + "admin/users")
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.users=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    });


    $scope.nodes;
    $scope.edges;
    $scope.user = {};
    $scope.generateNodesMap=function(user){
        $http.get(urlapi + "admin/nodesMap/" + user._id)
        .then(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            $scope.nodes=data.data.nodes;
            $scope.edges=data.data.edges;

            nodes=$scope.nodes;
            edges=$scope.edges;
            container = document.getElementById('mynetwork');
            var data = {
                nodes: nodes,
                edges: edges
            };
            var network = new vis.Network(container, data, options);
            console.log(nodes);
            console.log(edges);
            toastr.info("map completed, " + nodes.length + " nodes, " + edges.length + " edges");

        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        });

        $http.get(urlapi + 'users/' + user._id + '/network')
            .then(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.user = data.data; // for UI
            }, function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
    };
});
