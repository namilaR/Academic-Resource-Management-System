'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:LectureAvilabilityCtrl
 * @description
 * # LectureAvilabilityCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('LectureAvilabilityCtrl', [
    '$rootScope',
    '$scope',
    'appointmentDataService',
    function($rootScope, $scope, appointmentDataService) {
      console.log($scope.days);
      //load his/her timeSlots to logged in lecture
      appointmentDataService.getMyTimeSlots($rootScope.user).then(function(d){
        $scope.days = [];
        $scope.days = d.data;
        console.log(d.data);
      });
      //add new timeslot
      $scope.addTimeSlot = function(index) {
        $scope.days[index].timeSlots.push({});
      };
      //controle time slot visibility
      $scope.toggleVisibility = function(parentIndex, index) {
        if ($scope.days[parentIndex].timeSlots[index].visibility) {
          $scope.days[parentIndex].timeSlots[index].visibility = false;
        } else {
          $scope.days[parentIndex].timeSlots[index].visibility = true;
        }
      };
      //insert new timeslot to database
      $scope.saveTimeSlot = function(parentIndex, index) {
        appointmentDataService.saveTimeSlot({
          LecturerId: $rootScope.user.id,
          dayDetails: $scope.days[parentIndex],
          slot: $scope.days[parentIndex].timeSlots[index]
        });
      };
      //remove given timeslot from database
      $scope.removeTimeSlot = function(parentIndex, index) {
        $scope.days[parentIndex].timeSlots.splice(index, 1);
      };

    }
  ]);
