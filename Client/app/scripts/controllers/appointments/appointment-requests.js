'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentRequestsCtrl
 * @description
 * # AppointmentRequestsCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('AppointmentRequestsCtrl', [
    '$rootScope',
    '$scope',
    '$log',
    'appointmentDataService',
    'moment',
    function($rootScope,$scope, $log, appointmentDataService, moment) {
      $scope.subjects = [];
      $scope.lectures = [];
      $scope.appointmentRequest = {};
      $scope.called = false;

      var resetEverything = function() {
        $scope.called = false;
        $scope.appointmentRequest = {};
        $scope.availableTimeSlots = '';
        //load all lecture details to select2 component
        appointmentDataService.getAllLectures().then(
          function(response) {
            $scope.lectures = response.data;
          },
          function(error) {
            console.error(error);
          }
        );
        //load all lecture details to select2 component
        appointmentDataService.getAllSubjects().then(
          function(response) {
            $scope.subjects = response.data;
          },
          function(error) {
            console.error(error);
          }
        );
      };
      //send request data to server
      $scope.submitAppointmentRequestForm = function(isValid) {
          console.log($scope.appointmentRequestForm);
          if (isValid) {
            //get logged in user
            $scope.appointmentRequest.student = $rootScope.user;
            //invoke post method and pass $scope.appointmentRequest as a JSON object
            appointmentDataService.sendRequest($scope.appointmentRequest).then(
              function(response) {
                console.log(response);
                appointmentDataService.refreshTables();
                swal({
                  title: "Request Sent",
                  text: "You request has been successfully send",
                  type: "success",
                  timer: 2000
                })
              },
              function(error) {
                console.error(error);
              }
            );
            console.log($scope.appointmentRequest);
            resetEverything ();
            $scope.appointmentRequestForm.$setPristine();


          }
        };

        $scope.reload = function(){
          appointmentDataService.refreshTables();
        }


      //load all lecture details to select2 component
      appointmentDataService.getAllLectures().then(
        function(response) {
          $scope.lectures = response.data;
          console.log("All Lecturers");
          console.log(response.data);
        },
        function(error) {
          console.error(error);
        }
      );
      //load all lecture details to select2 component
      appointmentDataService.getAllSubjects().then(
        function(response) {
          $scope.subjects = response.data;
        },
        function(error) {
          console.error(error);
        }
      );

      $scope.dataChange = function(){
        appointmentDataService.getAvailableTimeSlots({id:this.appointmentRequest.LecturerId,date:this.appointmentRequest.selectedDate}).then(
          function(response) {
            console.log(response);
            $scope.called = true;
            $scope.availableTimeSlots = response.data;
          },
          function(error) {
            console.error(error);
          });
      };

      $scope.selectTimeSlot = function(timeSlot) {
        $scope.appointmentRequest.selectedTimeSlot = timeSlot;
        console.log(timeSlot);
      };

        console.log(appointmentDataService);

    }
  ]);
