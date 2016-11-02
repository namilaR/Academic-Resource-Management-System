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
        '$rootScope',
        'CONFIG',
        '$scope',
        '$log',
        'appointmentDataService',
        'moment',
        function($rootScope,CONFIG, $scope, $log, appointmentDataService, moment) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.pendingRequest = {};
            $scope.appointment = {};
            $scope.rooms = [];
            var data = {};

            $scope.$on('requestTableRowClick', function() {
                $scope.pendingRequest = {};
                appointmentDataService.getAPendingAppoinment(appointmentDataService.message).then(
                    function(response) {
                        var data = response.data;
                        console.log();
                        $scope.pendingRequest.id = data.id;
                        $scope.pendingRequest.requestTitle = data.appointmentTitle;
                        $scope.pendingRequest.requestSmallBref = data.appointmentSmallBref;
                        $scope.pendingRequest.appointmentDate = moment(data.appointmentDate).toDate();
                        $scope.pendingRequest.appointmentDay = data.TimeSlot.day;
                        $scope.pendingRequest.fromTime = moment(data.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.pendingRequest.toTime = moment(data.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.pendingRequest.Student = data.Student;
                        $scope.pendingRequest.timeSlot = data.TimeSlot;

                        appointmentDataService.getAvailableRooms($scope.pendingRequest).then(
                            function(response) {
                                $scope.rooms = response.data;
                            }
                        );
                    }
                );


            });

            $scope.placeAppoinment = function() {
                appointmentDataService.placeAppoinment($scope.pendingRequest).then(
                    function(d) {
                        console.log(d);
                        appointmentDataService.refreshTables();
                        angular.element("#myModal").modal('hide');
                    }
                );
            };

            $scope.$on('appoinmentTableRowClick', function() {
                $scope.appoinment = {};
                appointmentDataService.getAppointmentMoreDetails(appointmentDataService.message).then(
                    function(response) {
                        var data = response.data;
                        $scope.appoinment.id = data.id;
                        $scope.appoinment.Lecturer = data.TimeSlot.Lecturer;
                        $scope.appoinment.Student = data.Student;
                        $scope.appoinment.appointmentDate = moment(data.appointmentDate).toDate();
                        $scope.appoinment.appointmentDay = data.TimeSlot.day;
                        $scope.appoinment.fromTime = moment(data.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.appoinment.toTime = moment(data.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.appoinment.TimeSlot = data.TimeSlot;
                        $scope.appoinment.room = data.Room;
                        console.log(data.TimeSlot.toTime);
                    }
                );
            });

            $scope.selectRoom = function(room) {
                $scope.pendingRequest.selectedRoom = room;
                console.log(room);
            };

            $scope.showTimeTable = function(){
              window.open(CONFIG.BASE_URL+$scope.pendingRequest.Student.Batch.timeTable,'_blank');
            };



        }
    ]);
