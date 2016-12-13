'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('armsAngularApp')
  .directive('navBarPublic', function () {
    return {
      templateUrl: 'views/master/navbar-public.html',
      restrict: 'A',
      controller: 'NavbarCtrlUser',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the navBar directive');
      }
    };
  });
