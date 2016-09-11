'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:sideBar
 * @description
 * # sideBar
 */
angular.module('armsAngularApp')
  .directive('sideBar', function () {
    return {
      templateUrl: 'views/master/sidebar.html',
      controller : 'SidebarCtrl',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
