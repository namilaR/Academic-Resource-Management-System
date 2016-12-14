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
            var get_report_for_feedback_session = 'http://localhost:8002/feedback-session/get-report-for-feedback-session';

            //Loading the feed_back Select
            $scope.array = [];
            $scope.array.push({id: -1, feed_back: "Please select a Feedback Session"});
            $http.get(get_all_feedback_session_codes_for_report)
                .then(function(response) {
                    angular.forEach(response.data , function(element) {
                        var element_id = element.id;
                        $scope.array.push({id: element_id, feed_back: element.feed_back });
                    });
                });

            $scope.feedbacksessioncodes = {
                availableOptions: $scope.array,
                selectedOption : $scope.array[0]
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

            $scope.GetSelectedFeedbackSessionCodesValue = function () {

                var selectedFeedbackSessionCodesValue = $scope.feedbacksessioncodes.selectedOption.id;
                var selectedReportType = $scope.report_type.selectedOption.id;

                if(selectedFeedbackSessionCodesValue == -1 || selectedReportType == -1){
                    alert("Please select all report filters.");
                    return;
                }

                $scope.submitData = [
                    {
                        "feed_back_session_code": selectedFeedbackSessionCodesValue,
                        "report_type":selectedReportType
                    }
                ];


              $http({
                url: get_report_for_feedback_session,
                method: "POST",
                data:{
                  "feed_back_session_code": selectedFeedbackSessionCodesValue,
                  "report_type":selectedReportType
                }
              }).then(function(response) {

                var feedback_data =  response.data;


                if( feedback_data.length != 0 ){

                  for( var i = 0 ; i < feedback_data.length; i++){

                    var ans =  [
                      feedback_data[i].very_poor,
                      feedback_data[i].poor,
                      feedback_data[i].good,
                      feedback_data[i].very_good,
                      feedback_data[i].excellent
                    ];


                    loadChart(ans, feedback_data[i].question, i + 1);
                  }
                  $scope.showReportCharts();
                }else{

                  document.getElementById('report_chart_div').style.display = "none";
                }

              });




            };

            $scope.showReportCharts = function() {
                showReport();
            };

            function showReport(){
                document.getElementById('report_chart_div').style.display = "";
            }

            reportsDataservice.getChartData(1).then(function(res) {
                loadChart(res.data,'Loading....');
            });


            function loadChart(chart_data,report_type,number) {
                var ctx        = document.getElementById("myChart_"+number);

                var data = {
                    labels: ["Very Poor","Poor","Good","Very Good","Excellent"],
                    datasets: [
                        {
                            label: report_type,
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
