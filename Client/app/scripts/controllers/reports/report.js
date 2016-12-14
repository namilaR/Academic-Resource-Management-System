'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsRequestTableCtrl
 * @description
 * # AppointmentsRequestTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp').controller('ReportCtrl', [
        '$http',
        '$scope',
        '$q',
        '$rootScope',
        'reportsDataservice',
        function($http,$scope, $q, $rootScope,reportsDataservice) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            var get_all_feedback_session_codes_for_report = 'http://localhost:8002/feedback-session/get-all-feedback-sessions-for-report';

            //Loading the feed_back Select
            $scope.array = [];
            $scope.array.push({id: -1, feed_back: "Please select a Feedback Session"});
            $http.get(get_all_feedback_session_codes_for_report)
                .then(function(response) {
                    angular.forEach(response.data , function(element) {
                        $scope.array.push({id: element.id, feed_back: element.feed_back });
                    });
                });

            $scope.feedbacksessioncodes = {
                availableOptions: $scope.array,
                selectedOption : $scope.array[0]
            };

            $scope.GetValue = function (type) {
                var selectedOption = $scope.data.selectedOption
                $scope.typeChangeHandler(selectedOption.name);
            };


            $scope.report_type_array = [];
            $scope.report_type_array.push({id: -1, report_type: "Please select a report type"});
            $scope.report_type_array.push({id: "Lecturer", report_type: "Lecturer"});
            $scope.report_type_array.push({id: "Institute", report_type: "Institute"});
            $scope.report_type_array.push({id: "Subject", report_type: "Subject"});
            $scope.report_type = {
                availableOptions: $scope.report_type_array,
                selectedOption : $scope.report_type_array[0]
            };

            $scope.clearFeedbackSessionArray =  function(){
                $scope.feedback_sessions = [];
                $scope.feedback_sessions.push({id: -1, feedback: "Please select an institute"});
                $scope.feedback = {
                    availableOptions: $scope.feedback_sessions,
                    selectedOption : $scope.feedback_sessions[0]
                };
            }

            $scope.feedback_sessions = [];
            $scope.feedback_sessions.push({id: -1, feedback: "Please select a feedback session"});
            $scope.feedback = {
                availableOptions: $scope.feedback_sessions,
                selectedOption : $scope.feedback_sessions[0]
            };

            $scope.getFeedbackSessions = function(){
                $http.get(get_all_feedback_session_codes_for_report).success(function(data) {
                    $scope.feedback_sessions = [];
                    $scope.feedback_sessions.push({id: -1, feedback: "Please select a feedback session"});

                    for(var k in data) {
                        var feedback = data[k].feed_back;
                        var id = data[k].feed_back;
                        $scope.feedback_sessions.push({id: id, feedback: feedback});
                    }
                    $scope.feedback = {
                        availableOptions: $scope.feedback_sessions,
                        selectedOption : $scope.feedback_sessions[0]
                    };
                });
                console.log('loaded all feedback sessions...');
            };



            $scope.showReportCharts = function() {
                showReport();
            };

            function showReport(){
                document.getElementById('report_chart_div').style.display = "";
            }

            reportsDataservice.getChartData(1).then(function(res) {
                loadChart(res.data);
            });
            

            function loadChart(chart_data) {
                var ctx        = document.getElementById("myChart");

                var data = {
                    labels: ["Very Poor","Poor","Good","Very Good","Excellent"],
                    datasets: [
                        {
                            label: "QUESTIONS",
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 2,
                            data: chart_data,
                        }
                    ]
                };  
                
                new Chart(ctx, {
                    type: "bar",
                    data: data,
                    options: {
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });
            }
        }
]);
