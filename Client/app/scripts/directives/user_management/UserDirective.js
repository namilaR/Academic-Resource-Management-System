'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:User
 * @description
 * # User
 */
angular.module('armsAngularApp')
  .directive('user', function () {
    return {
      templateUrl: 'views/user_management/users.html',
      restrict: 'A',
      controller: 'userCtrl',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the navBar directive');
      }
    };
  });
