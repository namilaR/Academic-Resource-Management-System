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
    'appointmentDataservice',
    function($rootScope,$scope, appointmentDataservice) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      //
      // $scope.days = [{
      //   day: 'Monday',
      //   checked: false,
      //   timeSlots: [{
      //     visibility: true
      //   }]
      // }, {
      //   day: 'Tuesday',
      //   checked: true,
      //   timeSlots: [{}]
      // }, {
      //   day: 'Wednesday',
      //   checked: false,
      //   timeSlots: [{}]
      // }, {
      //   day: 'Thursday',
      //   checked: false,
      //   timeSlots: [{}]
      // }, {
      //   day: 'Friday',
      //   checked: false,
      //   timeSlots: [{}]
      // }, {
      //   day: 'Saturday',
      //   checked: false,
      //   timeSlots: [{}]
      // }, {
      //   day: 'Sunday',
      //   checked: false,
      //   timeSlots: [{}]
      // }, ];


      // $scope.days.push({
      //   day : 'Monday',
      //   checked : true,
      //   timeSlots : [
      //     {
      //       from : {
      //         hour : 08,
      //         min : 15,
      //         period: 'AM'
      //       },
      //       to:  {
      //         hour : 08,
      //         min : 40,
      //         period: 'AM'
      //       }
      //     },
      //     {
      //       from : {
      //         hour : 10,
      //         min : 15,
      //         period: 'AM'
      //       },
      //       to:  {
      //         hour : 10,
      //         min : 40,
      //         period: 'AM'
      //       }
      //     },
      //   ]
      // });
      console.log($scope.days);

      appointmentDataservice.getMyAppointmentLecture($rootScope.user).then(function(d){
        $scope.days = [];
        $scope.days = d.data;
        console.log(d.data);
      });

      $scope.addTimeSlot = function(index) {
        $scope.days[index].timeSlots.push({});
      };

      $scope.toggleVisibility = function(parentIndex, index) {
        if ($scope.days[parentIndex].timeSlots[index].visibility) {
          $scope.days[parentIndex].timeSlots[index].visibility = false;
        } else {
          $scope.days[parentIndex].timeSlots[index].visibility = true;
        }
      };

      $scope.saveTimeSlot = function(parentIndex, index) {
        appointmentDataservice.saveTimeSlot({
          LecturerId: $rootScope.user.id,
          dayDetails: $scope.days[parentIndex],
          slot: $scope.days[parentIndex].timeSlots[index]
        });
      };

      $scope.removeTimeSlot = function(parentIndex, index) {
        // console.log(parentIndex);
        // console.log(index);
        $scope.days[parentIndex].timeSlots.splice(index, 1);
      };

    }
  ]);
