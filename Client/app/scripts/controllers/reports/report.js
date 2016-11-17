'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsRequestTableCtrl
 * @description
 * # AppointmentsRequestTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp').controller('ReportCtrl', [
        '$scope',
        '$q',
        '$rootScope',
        'reportsDataservice',
        function($scope, $q, $rootScope,reportsDataservice) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            


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
