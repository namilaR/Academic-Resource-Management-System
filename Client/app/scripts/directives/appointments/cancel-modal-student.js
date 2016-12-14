'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:cancelModalStudent
 * @description
 * # cancelModalStudent
 */
angular.module('armsAngularApp')
  .directive('cancelModalStudent', function () {
    return {
    		templateUrl: 'views/appointments/cancel-modal.html',
    		restrict: 'E',
    		scope: {
    			  role: '@'
    		},
    		controller:'AppointmentRequestsCtrl',
    	  link: function postLink(scope, element, attrs) {
    	   
    	  }
    };
  });
