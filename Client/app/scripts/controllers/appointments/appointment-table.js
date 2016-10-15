'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentTableCtrl
 * @description
 * # AppointmentTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('AppointmentTableCtrl', [
    '$scope',
    'DTOptionsBuilder',
    'DTColumnBuilder',
    '$q',
    'appointmentDataService',
    'moment',
    '$rootScope',
    function($scope, DTOptionsBuilder, DTColumnBuilder, $q, appointmentDataService, moment, $rootScope) {
      var vm = this;
      var user = $rootScope.user;
      console.log(appointmentDataService);
      vm.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
          return promiseFunc();
        })
        // Add Bootstrap compatibility
        .withBootstrap();
      vm.dtColumns = [
        DTColumnBuilder.newColumn('appointmentDate').withTitle('Date').renderWith(function(data, type, full) {
          return moment(full.appointmentDate).format("MMM-DD");
        }),
        DTColumnBuilder.newColumn('TimeSlot.fromTime').withTitle('Start Time').renderWith(function(data, type, full) {
          return moment(full.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A");
        }),
        DTColumnBuilder.newColumn('TimeSlot.toTime').withTitle('End Time').renderWith(function(data, type, full) {
          return moment(full.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
        }),
        DTColumnBuilder.newColumn('appointmentTitle').withTitle('Title'),
        DTColumnBuilder.newColumn('approved').withTitle('Status').renderWith(function(data, type, full) {
          var st;
          if (full.approved == 'true') {
            return '<span class="label label-success">Pending</span>';
          } else {
            return '<span class="label label-warning">Pending</span>';
          }
        }),
        DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().renderWith(actionsHtml)
      ];
      vm.newPromise = promiseFunc();
      vm.reloadData = reloadData;
      vm.dtInstance = {};

      function actionsHtml(data, type, full, meta) {
        return '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
          '   Cancel' +
          '</button>';
      }

      $scope.reload = function() {
        //vm.dtInstance.reloadData();
         appointmentDataService.refreshTables();
      };


      function promiseFunc() {
        var deferred = $q.defer();
        appointmentDataService.getMyAppointmentsLecture(user).then(function(response) {
          console.log(response.data);
          deferred.resolve(response.data);
        });
        return deferred.promise;
      };

      function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
      }

      function callback(json) {
        console.log(json);
      }

      $scope.$on('refreshDataTables', function() {
        console.log('refreshDataTables');
          vm.dtInstance.reloadData();
      });

    }
  ]);
