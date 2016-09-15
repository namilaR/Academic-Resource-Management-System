'use strict';

/**
 * @ngdoc service
 * @name armsAngularApp.appointments/appointmentDataservice
 * @description
 * # appointments/appointmentDataservice
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .service('appointmentDataservice', [
        '$http',
        'CONFIG',
        function($http, CONFIG) {
            //get base url
            var baseUrl = CONFIG.BASE_URL;
            var appointmentDataservice = {};

            appointmentDataservice.getAllLectures = function() {
                return $http.get(baseUrl + 'lecturer');
            };

            appointmentDataservice.getAllSubjects = function() {
                return $http.get(baseUrl + 'subject');
            };            

            appointmentDataservice.getMyAppointment = function() {
                return $http.get(baseUrl + 'subject');
            };

            return appointmentDataservice;
        }
    ]);
