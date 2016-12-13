'use strict';

/**
 * @ngdoc service
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .factory('QuizService', ['$http', 'CONFIG', function($http, CONFIG) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var baseUrl = CONFIG.BASE_URL;
        var QuizService = {};


        QuizService.getAllQuestions = function() {
            return $http.get(baseUrl + 'question/get-available-quiz');
        };



        QuizService.createFeedback = function(feedback){

            return $http.post(baseUrl + 'feedback', feedback);
        };


        return QuizService;
    }]);
