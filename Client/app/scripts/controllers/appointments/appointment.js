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
        'moment',
        function($scope, $log, appointmentDataservice, moment) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.subjects = [];
            $scope.lectures = [];
            $scope.appointmentRequest = {};
            //send request data to server
            $scope.submitAppointmentRequestForm = function(isValid) {
                if (isValid) {
                    //convert date to SQL format
                    $scope.appointmentRequest.requestDate = moment($scope.appointmentRequest.requestDate).format("YYYY-MM-DD");
                    //convert time to SQL format
                    $scope.appointmentRequest.requestStartTime = moment($scope.appointmentRequest.requestStartTime).format("HH:mm");
                    $scope.appointmentRequest.requestEndTime = moment($scope.appointmentRequest.requestEndTime).format("HH:mm");
                    //set status to 1
                    $scope.appointmentRequest.status = 1;
                    //invoke post method and pass $scope.appointmentRequest as a JSON object 
                    appointmentDataservice.sendRequest(JSON.stringify($scope.appointmentRequest)).then(
                        function(response) {
                            console.log(response);
                            swal({   title: "Request Sent",   text: "You request has been successfully send",   type: "success", timer :2000})
                        },
                        function(error) {
                            console.error(error);
                        }
                    );
                    //reset statue
                    $scope.appointmentRequest = {};
                    $scope.appointmentRequestForm.$setPristine();
                }
            }
            //load all lecture details to select2 component 
            appointmentDataservice.getAllLectures().then(
                function(response) {
                    $scope.lectures = response.data;
                },
                function(error) {
                    console.error(error);
                }
            );
            //load all lecture details to select2 component 
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
                $scope.appointmentRequest.requestDate = new Date();
            };
            $scope.clear = function() {
                $scope.appointmentRequest.requestDate = null;
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
                $scope.appointmentRequest.requestDate = new Date(year, month, day);
            };
            $scope.popup2 = {
                opened: false
            };
            /*********************************
                ANGULAR UI TIMEPICKER CONFIGS
             *********************************/
            $scope.appointmentRequest.requestStartTime = $scope.appointmentRequest.requestEndTime = new Date()
            $scope.hstep = 1;
            $scope.mstep = 1;
            $scope.ismeridian = true;
            $scope.toggleMode = function() {
                $scope.ismeridian = !$scope.ismeridian;
            };
            $scope.changed = function() {
                $log.log('Time changed to: ' + $scope.appointmentRequest.requestStartTime + ' ' + $scope.appointmentRequest.requestEndTime);
            };
        }
    ]);
