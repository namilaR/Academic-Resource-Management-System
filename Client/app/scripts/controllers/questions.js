'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('QuestionsCtrl', ['$scope', 'QuestionService', function($scope, QuestionService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        $scope.array = [];
        $scope.array.push({id: '', name: "Please Select"});
        $scope.array.push({id: 'Lecturer', name: "Lecturer"});
        $scope.array.push({id: 'Institute', name: "Institute"});
        $scope.array.push({id: 'Subject', name: "Subject"});
        $scope.updateQuestion = null;

        $scope.data = {
            availableOptions: $scope.array,
            selectedOption : $scope.array[0]
        };

        $scope.GetValue = function (type) {
            var selectedOption = $scope.data.selectedOption
            return selectedOption.name;
        };



        function getQuestionData() {
            QuestionService.getAllQuestions().then(function(res) {
                $scope.allQuestions = res.data;
                return res.data;
            });
        }

        function createNewQuestion() {
            var question = {};
            question.question = $scope.question;
            question.questionType = $scope.questionType;
            QuestionService.createNewQuestion(question).then(function(response) {
                if (response.status === 200) {
                    swal('success', "insert new question", 'success');
                    getQuestionData();
                } else {
                    swal('Error', 'Not inserted record', 'error');
                }
            });
        }


        $scope.submitQuestionForm = function() {
            return createNewQuestion();
        };



        $scope.deleteQuestion = function(questionId) {
            QuestionService.deleteQuestion(questionId).then(function(res) {
                if (res.status === 200) {
                    swal('success', "delete the question", 'success');
                    getQuestionData();
                } else {
                    swal('Error', 'Not inserted record', 'error');
                }
            });
        };

        $scope.loadModal = function(question) {
            console.log(question);
            $scope.updateQuestion = question
        }
        $scope.updateQuestionInstance = function() {
            swal({
                title: "Are You sure to update this question ",
                text: "After you update the values are replaced",
                showCancelButton: true,
                animation: "slide-from-top",
                inputPlaceholder: "question eg:test question?",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, update it!",
                closeOnConfirm: true
            }, function() {
                QuestionService.updateQuestion($scope.updateQuestion).then(function(result) {
                    if (result.status === 200) {
                        swal('success', 'Updated values', 'success');
                        getQuestionData();
                    } else {
                        swal('error', 'Error is going on', 'Error');
                    }
                });
            });
        };


        getQuestionData();



    }]);
