'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:iCheck
 * @description
 * # iCheck
 */
angular.module('armsAngularApp')
  .directive('iCheck',function () {
    return {
      restrict: 'A',
     link: function(scope, element, attrs) {
       element.iCheck({
         checkboxClass: 'icheckbox_square-blue',
         radioClass: 'iradio_square-blue',
         increaseArea: '20%' // optional
       });
      }
    };
  });
