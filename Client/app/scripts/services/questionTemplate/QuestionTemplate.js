'use strict';

/**
 * @ngdoc service
 * @name armsAngularApp.Question
 * @description
 * # Question
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .factory('QuestionTemplateService', ['$http', 'CONFIG', function($http, CONFIG) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var baseUrl = CONFIG.BASE_URL;
        var QuestionTemplateService = {};


        QuestionTemplateService.createNewQuestionTemplate = function(questionTemplate) {
            console.log(question);
            return $http.post(baseUrl + 'question', questionTemplate);
        };


        QuestionTemplateService.getAllQuestions = function() {
            return $http.get(baseUrl + 'question');
        };

        QuestionTemplateService.deleteQuestion = function(questionId) {
            return $http({
                method: 'delete',
                url: baseUrl + 'question',
                params: {
                    questionId: questionId
                }
            }).then(function(res) {
                return res;
            });
        };

        QuestionTemplateService.updateQuestion = function(questionInstance) {
            return $http({
                method: 'put',
                url: baseUrl + 'question',
                params: questionInstance
            }).then(function(res) {
                return res;
            });
        };

        return QuestionTemplateService;
    }]);