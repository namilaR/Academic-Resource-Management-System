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
      templateUrl: 'views/user_management/user_types.html',
      restrict: 'A',
      controller: 'userTypeCtrl',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
