'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:FeedbackFeedbackCtrl
 * @description
 * # FeedbackFeedbackCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('FeedbackFeedbackCtrl', [
    '$scope',
    function($scope) {
      this.awesomeThings = [
        '$scope',
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];



      /*********************************
          ANGULAR UI TIMEPICKER CONFIGS
       *********************************/
      //
      // $scope.hstep = 1;
      // $scope.mstep = 1;
      // $scope.ismeridian = true;
      // $scope.toggleMode = function() {
      //   $scope.ismeridian = !$scope.ismeridian;
      // };
      // $scope.changed = function() {
      //   console.log('startTime' + $scope.pendingRequest.appointmentEndTime);
      //   //console.log('endTime' + $scope.endTime);
      // };



      /*********************************
          ANGULAR UI DATEPICKER CONFIGS
       *********************************/
      // $scope.today = function() {
      //   $scope.pendingRequest.appointmentDate = new Date();
      // };
      // $scope.clear = function() {
      //   $scope.pendingRequest.appointmentDate = null;
      // };
      // $scope.dateOptions = {
      //   formatYear: 'yy',
      //   maxDate: new Date(2020, 5, 22),
      //   minDate: new Date(),
      //   startingDay: 1
      // };
      // $scope.open2 = function() {
      //   $scope.popup2.opened = true;
      // };
      // $scope.setDate = function(year, month, day) {
      //   $scope.pendingRequest.appointmentDate = new Date(year, month, day);
      //   console.log($scope.pendingRequest.appointmentDate);
      // };
      // $scope.popup2 = {
      //   opened: false
      // };


      function startDateOnSetTime() {
        $scope.$broadcast('start-date-changed');
      }

      function endDateOnSetTime() {
        $scope.$broadcast('end-date-changed');
      }

      function startDateBeforeRender($dates) {
        if ($scope.dateRangeEnd) {
          var activeDate = moment($scope.dateRangeEnd);

          $dates.filter(function(date) {
            return date.localDateValue() >= activeDate.valueOf();
          }).forEach(function(date) {
            date.selectable = false;
          });
        }
      }

      function endDateBeforeRender($view, $dates) {
        if ($scope.dateRangeStart) {
          var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

          $dates.filter(function(date) {
            return date.localDateValue() <= activeDate.valueOf();
          }).forEach(function(date) {
            date.selectable = false;
          });
        }
      }

      $scope.endDateBeforeRender = endDateBeforeRender;
      $scope.endDateOnSetTime = endDateOnSetTime;
      $scope.startDateBeforeRender = startDateBeforeRender;
      $scope.startDateOnSetTime = startDateOnSetTime;
    }
  ]);
