'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('NavbarCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.toggleSideBar = function () {
    console.log('click');
      var body = angular.element('body');
      if (body.hasClass('sidebar-collapse')) {
        body.removeClass('sidebar-collapse');
      }
      else {
        body.addClass('sidebar-collapse');
      }
    };
  });
