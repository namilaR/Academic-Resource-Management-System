'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('NavbarCtrlUser', function ($scope,$location) {
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
