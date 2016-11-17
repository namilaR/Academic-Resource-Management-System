'use strict';
/**
 * @ngdoc service
 * @name armsAngularApp.appointments/appointmentDataservice
 * @description
 * # appointments/appointmentDataservice
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .service('reportsDataservice', [
        '$http',
        'CONFIG',
        '$rootScope',
        function($http, CONFIG,$rootScope) {
            //get base url
            var baseUrl = CONFIG.BASE_URL;
            var reportsDataservice = {};
            var message = '';

            reportsDataservice.getChartData = function(questionId) {
                return $http({
                    method: 'get',
                    url: baseUrl + 'reports/getChartData',
                    params: {
                        questionId: questionId
                    }
                }).then(function(res) {
                    return res;
                });
            };


            return reportsDataservice;
        }
    ]);
