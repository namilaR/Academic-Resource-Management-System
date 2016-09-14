'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:footer
 * @description
 * # footer
 */
angular.module('armsAngularApp')
  .directive('footer', function () {
    return {
      templateUrl: 'views/master/footer.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
