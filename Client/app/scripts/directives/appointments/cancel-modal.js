'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:cancelModal
 * @description
 * # cancelModal
 */
angular.module('armsAngularApp')
  .directive('cancelModal', function () {
    return {
    	templateUrl: 'views/appointments/cancel-modal.html',
    	restrict: 'E',
    	scope: {
    		  role: '@'
    	},
    	controller:'AppointmentCtrl',
      link: function postLink(scope, element, attrs) {
       
      }
    };
  });
