



angular.module('armsAngularApp')
    .controller('QuizCtrl',['$scope','QuizService','DTOptionsBuilder', 'DTColumnBuilder',  function ($scope ,QuizService, DTOptionsBuilder, DTColumnBuilder) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.feedbacks = [
            {id:1,name:"Very Poor"},
            {id:2,name:"Poor"},
            {id:3,name:"Good"},
            {id:4,name:"Very Good"},
            {id:5,name:"Excellent"}
        ]

        function getQuestionData() {
            QuizService.getAllQuestions().then(function(res) {
                $scope.questions = res.data;
            });
        }

        getQuestionData();






        $scope.viewResults = function(){
           console.log($scope.questions[0].qus.id);
                var i;
                for (i=0; i<$scope.questions.length; i++){

                    createNewFeedback($scope.questions[i]);

                }

        };



        function createNewFeedback(feedbackInstance) {
            var feedback = {};
            feedback.QuestionId = feedbackInstance.qus.id;

            if(feedbackInstance.ans.id == 1){
                feedback.answerOneCount = 1;
                QuizService.createFeedback(feedback);

            }
            if(feedbackInstance.ans.id == 2){

                feedback.answerTwoCount = 1;
                QuizService.createFeedback(feedback);
            }
            if(feedbackInstance.ans.id == 3){
                feedback.answerThreeCount = 1;
                QuizService.createFeedback(feedback);
            }
            if(feedbackInstance.ans.id == 4){
                feedback.answerFourCount = 1;
                QuizService.createFeedback(feedback);
            }
            if(feedbackInstance.ans.id == 5){
                feedback.answerFiveCount = 1;
                QuizService.createFeedback(feedback);
            }

        }





    }]);