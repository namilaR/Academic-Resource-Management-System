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
        function(DTOptionsBuilder, DTColumnBuilder, $q, appointmentDataservice) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            var vm = this;
            vm.dtOptions = DTOptionsBuilder
                .fromFnPromise(appointmentDataservice.getMyAppointment())
                // Add Bootstrap compatibility
                .withBootstrap();
            vm.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('ID').withClass('text-danger'),
                DTColumnBuilder.newColumn('role').withTitle('Role'),
                DTColumnBuilder.newColumn('createdAt').withTitle('Created At'),
                DTColumnBuilder.newColumn('updatedAt').withTitle('Updated At')
            ];




        }
    ]);
