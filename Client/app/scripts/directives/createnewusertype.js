'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:createNewUserType
 * @description
 * # createNewUserType
 */
angular.module('armsAngularApp')
  .directive('createNewUserType', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the createNewUserType directive');
      }
    };
  });
