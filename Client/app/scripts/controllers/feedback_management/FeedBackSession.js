'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:FeedbacksessionsCtrl
 * @description
 * # FacultyMainCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
.controller('FeedbacksessionsCtrl',['$http','$scope','$rootScope','DTOptionsBuilder', 'DTColumnBuilder','AuthenticationService',  function ($http,$scope,$rootScope, DTOptionsBuilder, DTColumnBuilder,AuthenticationService) {
        this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];


        // accessable api`s
        var get_all_batches_api = 'http://localhost:8002/feedback-session/get-all-batches';
        var create_feedback_sessions_api = 'http://localhost:8002/feedback-session/create_feedback_sessions';
        var get_all_feed_back_sessions = 'http://localhost:8002/feedback-session/get-all-feedback-sessions';


        var dept_id ;
        var user_credentials = AuthenticationService.getUserCredentials();
        var user_type = user_credentials.usertype;
        if(user_type == 'HOD'){ dept_id = user_credentials.dept;  }


        //Loading the batches for select option
        $scope.array = [];
        $scope.array.push({id: -1, batchName: "Please select a Batch"});
        $http.get(get_all_batches_api)
            .then(function(response) {
                angular.forEach(response.data , function(element) {
                    $scope.array.push({id: element.id, batchName: element.batchName });
                });
            });

        $scope.data = {
            availableOptions: $scope.array,
            selectedOption : $scope.array[0]
        };

        $scope.year_array = [];
        $scope.year_array.push({id: -1, year: "Please select a year"});
        $scope.year_array.push({id: 1, year: '1st'});
        $scope.year_array.push({id: 2, year: '2nd'});
        $scope.year_array.push({id: 3, year: '3rd'});
        $scope.year_array.push({id: 4, year: '4th'});

        $scope.year = {
            availableOptions: $scope.year_array,
            selectedOption : $scope.year_array[0]
        };

        $scope.batch_week = [];
        $scope.batch_week.push({id: -1, batch_week: "Please select a Week"});
        $scope.batch_week.push({id: 'WE', batch_week: 'WE'});
        $scope.batch_week.push({id: 'WD', batch_week: 'WD'});

        $scope.batch_week = {
            availableOptions: $scope.batch_week,
            selectedOption : $scope.batch_week[0]
        };

        $http.get(get_all_feed_back_sessions).success(function(data) {
            $scope.sessionsList = data;
        });

        $scope.rowWidth = {'width': '200px' };
        function setRowWidth(newWidth){
            $scope.rowWidth = {'width': newWidth + 'px' }
        }

        $scope.createFeedbackSession = function() {

            var batch = $scope.data.selectedOption.id;
            var batch_week = $scope.batch_week.selectedOption.batch_week;
            var year = $scope.year.selectedOption.id;

            console.log(batch + "-" + batch_week + '-' + year);

            $scope.submitData = [
                {
                    "batch": batch,
                    "batch_week": batch_week,
                    "year": year
                }
            ];

            $scope.myDate = new Date();

            $http.post(create_feedback_sessions_api,$scope.submitData).then(
                (function(){
                        alert("ok");

                        $http.get(get_all_feed_back_sessions).success(function(data) {
                            $scope.phones = data;
                        });

                        $http.get(get_all_feed_back_sessions).success(function(data) {
                            $scope.sessionsList = data;
                        });
                    }
                )
            );
        }





        /*********************************
         ANGULAR UI DATEPICKER CONFIGS
         *********************************/
        $scope.today = function() {
            $scope.pendingRequest.appointmentDate = new Date();
        };
        $scope.clear = function() {
            $scope.pendingRequest.appointmentDate = null;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.setDate = function(year, month, day) {
            $scope.pendingRequest.appointmentDate = new Date(year, month, day);
            console.log($scope.pendingRequest.appointmentDate);
        };
        $scope.popup2 = {
            opened: false
        };
        /*********************************
         ANGULAR UI TIMEPICKER CONFIGS
         *********************************/

        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = !$scope.ismeridian;
        };
        $scope.changed = function() {
            console.log('startTime' + $scope.pendingRequest.appointmentEndTime);
            //console.log('endTime' + $scope.endTime);
        };


    }]);
