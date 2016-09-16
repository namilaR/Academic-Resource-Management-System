'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsAppointmentCtrl
 * @description
 * # AppointmentsAppointmentCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('AppointmentCtrl', [
        '$scope',
        '$log',
        'appointmentDataservice',
        function($scope,$log, appointmentDataservice) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.subjects = [];
            $scope.lectures = [];
            $scope.appointmentRequest= {};

            $scope.submitAppointmentRequestForm = function(isValid) {
                 if (isValid) {
                    console.log($scope.appointmentRequest);
                    $scope.appointmentRequest = {};
                    $scope.appointmentRequestForm.$setPristine();
                 }
            }


            appointmentDataservice.getAllLectures().then(
                function(response) {
                    $scope.lectures = response.data;
                },
                function(error) {
                    console.error(error);
                }
            );

            appointmentDataservice.getAllSubjects().then(
                function(response) {
                    $scope.subjects = response.data;
                },
                function(error) {
                    console.error(error);
                }
            );


            /*********************************
                ANGULAR UI DATEPICKER CONFIGS
             *********************************/
            $scope.today = function() {
                $scope.appointmentRequest.date = new Date();
            };

            $scope.clear = function() {
                $scope.appointmentRequest.date = null;
            };
            $scope.dateOptions = {

                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };
            $scope.setDate = function(year, month, day) {
                $scope.appointmentRequest.date = new Date(year, month, day);
            };
            $scope.popup2 = {
                opened: false
            };

            /*********************************
                ANGULAR UI TIMEPICKER CONFIGS
             *********************************/
            $scope.appointmentRequest.startTime = $scope.appointmentRequest.endTime  = new Date()
            $scope.hstep = 1;
            $scope.mstep = 1;
            $scope.ismeridian = true;
            $scope.toggleMode = function() {
              $scope.ismeridian = ! $scope.ismeridian;
            };
            $scope.changed = function () {
              $log.log('Time changed to: ' + $scope.appointmentRequest.startTime + ' ' + $scope.appointmentRequest.endTime);
            };






        }
    ]);
