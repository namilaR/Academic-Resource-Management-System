'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('SidebarCtrl', function ($location,$scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //get current url path
    var url = $location.path();
    //split url using "/" as a delemeter
    $scope.pathPara1 = url.split('/')[1];
    $scope.pathPara2 = url.split('/')[2];


  });
