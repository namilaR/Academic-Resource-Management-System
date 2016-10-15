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
    '$scope',
    '$log',
    'appointmentDataService',
    'moment',
    function($rootScope,$scope, $log, appointmentDataService, moment) {
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
          function(response){
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
              function(response){
                $scope.rooms = response.data;
              }
            );
          }
        );


      });

      $scope.placeAppoinment  = function() {
          appointmentDataService.placeAppoinment($scope.pendingRequest).then(
            function(d){
              console.log(d);
              appointmentDataService.refreshTables();
              angular.element("#myModal").modal('hide');
            }
          );
      };
      // $scope.sendAppoinmentData = function() {
      //   //convert date to SQL format
      //   data.appointmentDate = moment($scope.pendingRequest.appointmentDate).format("YYYY-MM-DD");
      //   //set status to 1
      //   data.status = 1;
      //   data.RoomId = $scope.pendingRequest.RoomId;
      //   //invoke post method and pass $scope.pendingRequest as a JSON object
      //   appointmentDataService.sendAppointment(data).then(
      //     function(response) {
      //       console.log(response);
      //       appointmentDataService.refreshTables();
      //       swal({
      //         title: "Request Sent",
      //         text: "You request has been successfully send",
      //         type: "success",
      //         timer: 2500
      //       });
      //
      //     },
      //     function(error) {
      //       console.error(error);
      //     }
      //   );
      // };

      $scope.selectRoom = function(room) {
        $scope.pendingRequest.selectedRoom = room;
        console.log(room);
      };



    }
  ]);
