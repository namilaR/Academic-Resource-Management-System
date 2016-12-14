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
        var update_feed_back_session_api = 'http://localhost:8002/feedback-session/update-feedback-session';
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

        function getAllFeedBackSessions(){
            $http.get(get_all_feed_back_sessions).success(function(data) {
                $scope.mainFeedBackSessionsList = data;
                for(var k in $scope.mainFeedBackSessionsList) {
                    var date = new Date($scope.mainFeedBackSessionsList[k].feedbackSessionDate);
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    var datestring = year +  "-" + month + "-" + day ;
                    $scope.mainFeedBackSessionsList[k].feedbackSessionDate = datestring;
                }

            });
            console.log('loaded all feedback sessions...');
        }

        getAllFeedBackSessions();

        $http.get(get_all_feed_back_sessions).success(function(data) {
            $scope.sessionsList = data;
        });


        $scope.smallRowWidth = {'width': '100px' };
        $scope.rowWidth = {'width': '200px' };
        function setRowWidth(newWidth){
            $scope.smallRowWidth = {'width': newWidth + 'px' }
            $scope.rowWidth = {'width': newWidth + 'px' }
        }

        //  creating the new feedbacksessions
        $scope.createFeedbackSession = function() {

            var batch = $scope.data.selectedOption.id;
            var batch_week = $scope.batch_week.selectedOption.batch_week;
            var year = $scope.year.selectedOption.id;

            $scope.submitData = [
                {
                    "batch": batch,
                    "batch_week": batch_week,
                    "year": year
                }
            ];

            $http.post(create_feedback_sessions_api,$scope.submitData).then(
                (function(){
                        alert("New Feed back Sessions Created");
                        $http.get(get_all_feed_back_sessions).success(function(data) {
                            $scope.phones = data;
                        });
                        getAllFeedBackSessions();
                    }
                )
            );
        }



        function updateFeedBackSession(api,update_property,update_value,row_id){
            $scope.submitData = [
                {
                    "update_property": update_property,
                    "update_value": update_value,
                    "row_id": row_id
                }
            ];

            $http.post(api,$scope.submitData).then(
                (function(){
                        getAllFeedBackSessions();
                    }
                )
            );
        }


        $scope.feedback_session_start_time = [];
        $scope.setFeedbackSessionStartTime = function(row_id,value){
            var res = value.split(":");
            var d = new Date();
            d.setHours( res[0]);
            d.setMinutes( res[1]);
            $scope.feedback_session_start_time[row_id] = new Date(d);
        };

        $scope.feedback_session_end_time = [];
        $scope.setFeedbackSessionEndTime = function(row_id,value){
            var res = value.split(":");
            var d = new Date();
            d.setHours( res[0]);
            d.setMinutes( res[1]);
            $scope.feedback_session_end_time[row_id] = new Date(d);
        };

        $scope.feedback_session_status = [];
        $scope.setFeedbackSessionStatus = function(row_id,value){
            if(value == 1){
                value = true;
            }else{
                value = false;
            }
            $scope.feedback_session_status[row_id] = value;
        };

        $scope.feedback_session_date = [];
        $scope.setFeedbackSessionDate = function(row_id,value){
            var date = new Date(value);
            var datestring = date.getFullYear() +  "-" + date.getDate() + "-" + date.getMonth();
            $scope.feedback_session_date[row_id] = new Date(datestring);
            console.log(datestring);
        };

        $scope.feedbackSessionStartTimeChange = function (index) {
            var time = new Date($scope.feedback_session_start_time[index]);
            var timestamp = time.toUTCString();
            console.log('Feedback Session Start time - [ id ] --  ' + time + ' -- '+ index );
            updateFeedBackSession(update_feed_back_session_api,'feedback_session_start_time',$scope.feedback_session_start_time[index],index);
        };


        $scope.feedbackSessionEndTimeChange = function (index) {
           console.log('Feedback Session End time [ id ] --  ' +  $scope.feedback_session_end_time[index] + ' -- '+ index);
            updateFeedBackSession(update_feed_back_session_api,'feedback_session_end_time',$scope.feedback_session_end_time[index],index);
        };

        $scope.feedbackSessionStatusChange = function (index) {
           console.log('Feedback Session Status [ id ] --  ' +  $scope.feedback_session_status[index] + ' -- '+ index);
            updateFeedBackSession(update_feed_back_session_api,'feedback_session_status',$scope.feedback_session_status[index],index);
        };

        $scope.feedbackSessionDateChange = function (index) {
            console.log('date -- ' + $scope.feedback_session_date[index] );
            var date = new Date($scope.feedback_session_date[index]);
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var datestring = year +  "-" + (month + 1) + "-" + day;
           console.log('Feedback Session Date [ id ] --  ' +  datestring + ' -- '+ index);
            updateFeedBackSession(update_feed_back_session_api,'feedback_session_date',datestring,index);
        };



        /********************
         *
         *  UI Element Configurations
         *
         * ****/


        //ui-bootstrap-datepicker configurations
        $scope.feedbackSessionDate = [];
        $scope.openfeedbackSessionDate = function($event, index) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.feedbackSessionDate[index] = true;
        };

        // ui-bootstrap-timepicker configurations
        $scope.mytime = new Date();
        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.ismeridian = false;

        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };


}]);

