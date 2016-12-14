'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:detailModal
 * @description
 * # detailModal
 */
angular.module('armsAngularApp')
    .directive('detailModal', function() {
        return {
            templateUrl: 'views/appointments/detail-modal.html',
            restrict: 'E',
            scope: {
                role: '@'
            },
            controller: 'DetailModalCtrl',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
