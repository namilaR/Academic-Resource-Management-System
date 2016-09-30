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
    '$rootScope',
    function($http, CONFIG, $rootScope) {
      //get base url
      var baseUrl = CONFIG.BASE_URL;
      var appointmentDataservice = {};
      var message = '';

      appointmentDataservice.getAllLectures = function() {
        return $http.get(baseUrl + 'lecturer');
      };
      appointmentDataservice.getAllSubjects = function() {
        return $http.get(baseUrl + 'subject');
      };
      appointmentDataservice.getMyAppointment = function() {
        return $http.get(baseUrl + 'subject');
      };
      appointmentDataservice.sendRequest = function(appointmentRequest) {
        return $http.post(baseUrl + 'request/create', JSON.stringify(appointmentRequest));
      };
      appointmentDataservice.getPendingRequests = function() {
        return $http.get(baseUrl + 'request');
      };
      appointmentDataservice.getStudentRequests = function(lecturer) {
        console.log(lecturer);
        return $http.get(baseUrl + 'request/get-student-requests', {
          params: lecturer
        });
      };

      appointmentDataservice.getAvailableRooms = function() {
        return $http.get(baseUrl + 'appointment/get-available-rooms');
      };
      appointmentDataservice.sendAppointment = function(appointment) {
        return $http.post(baseUrl + 'appointment/create', JSON.stringify(appointment));
      };

      appointmentDataservice.getMyAppointmentLecture = function(lecturer) {
        return $http.get(baseUrl + 'lecturer/get-my-appointments', {
          params: lecturer
        });
      };

      appointmentDataservice.passRequestData = function(msg) {
        this.message = msg;
        $rootScope.$broadcast('requestTableRowClick');

      };

      appointmentDataservice.refreshTables = function() {
        $rootScope.$broadcast('refreshDataTables');

      };


      appointmentDataservice.getMyAppointmentLecture = function(lecturer) {
        return $http.get(baseUrl + 'lecturer/get-my-slots', {
          params: lecturer
        });
      };

      appointmentDataservice.saveTimeSlot = function(timeSlot) {
        console.log(timeSlot);
        return $http.post(baseUrl + 'lecturer/save-timeslot', JSON.stringify(timeSlot));

      };


      return appointmentDataservice;
    }
  ]);
