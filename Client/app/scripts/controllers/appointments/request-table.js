'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsRequestTableCtrl
 * @description
 * # AppointmentsRequestTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('RequestTableCtrl', [
        'DTOptionsBuilder',
        'DTColumnBuilder',
        '$q',
        'appointmentDataservice',
        'moment',
        function(DTOptionsBuilder, DTColumnBuilder, $q, appointmentDataservice, moment) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            var vm = this;
            vm.dtOptions = DTOptionsBuilder
                .fromFnPromise(appointmentDataservice.getPendingRequests().then(function(response) {
                    console.log(response.data)
                    return response.data;
                }))
                // Add Bootstrap compatibility
                .withBootstrap();
            vm.dtColumns = [
                DTColumnBuilder.newColumn('requestTitle').withTitle('Title').withClass('text-danger'),
                DTColumnBuilder.newColumn('requestDate').withTitle('Date').renderWith(function(data, type, full) {
                    return moment(full.requestDate).format("MMM-DD");
                }),
                DTColumnBuilder.newColumn('requestStartTime').withTitle('Start Time').renderWith(function(data, type, full) {
                    return moment(full.requestStartTime, 'HH:mm:ss').format("hh:mm A");
                }),
                DTColumnBuilder.newColumn('requestEndTime').withTitle('End Time').renderWith(function(data, type, full) {
                    return moment(full.requestEndTime, 'HH:mm:ss').format("hh:mm A");
                }),
                DTColumnBuilder.newColumn('status').withTitle('Status').renderWith(function(data, type, full) {
                    var st;
                    if (full.status == 'true') {
                        return '<span class="label label-warning">Pending</span>';
                    } else {
                        return '<span class="label label-warning">Pending</span>';
                    }
                }),
                DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().renderWith(actionsHtml)
            ];
            function actionsHtml(data, type, full, meta) {
                return '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
                    '   Cancel' +
                    '</button>';
            }
        }
    ]);
