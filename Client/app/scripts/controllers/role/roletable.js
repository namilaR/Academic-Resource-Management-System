'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:RoleRoletableCtrl
 * @description
 * # RoleRoletableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('RoleRoletableCtrl', [
        'DTOptionsBuilder',
        'DTColumnBuilder',
        '$q',
        'dataServiceRole',
        function(DTOptionsBuilder, DTColumnBuilder, $q, dataServiceRole) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            //console.log($q);


            function getTableData() {
                //invloke api service
                var promise = dataServiceRole.getAllUsers().then(function(response) {
                    //console.log(response);
                    return response.data;
                });
                return promise;
            }

            var vm = this;
            vm.dtOptions = DTOptionsBuilder
                .fromFnPromise(getTableData())
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
