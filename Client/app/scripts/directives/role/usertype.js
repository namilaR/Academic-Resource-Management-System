'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:UserType
 * @description
 * # UserType
 */
angular.module('armsAngularApp')
  .directive('userType', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the UserType directive');
      }
    };
  });
