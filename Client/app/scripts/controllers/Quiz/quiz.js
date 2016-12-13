angular.module('armsAngularApp')
    .controller('QuizCtrl',['$scope','$routeParams','$location','$http','$sce','QuizService','DTOptionsBuilder', 'DTColumnBuilder',  function ($scope ,$routeParams,$location,$http,$sce,QuizService, DTOptionsBuilder, DTColumnBuilder) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.feedbacksession_waiting_message = $sce.trustAsHtml('');
        $scope.feedbacksession_message = $sce.trustAsHtml('');
        $scope.feed_back_session_code = '';
        var check_feedbacksession_available_api = 'http://localhost:8002/feedback-session/check-feedbacksession-available';

        $scope.authenticateFeedbackSession = function(){
            $scope.continue_btn = {'display':'none'};
            $scope.feedbacksession_waiting_message = $sce.trustAsHtml('<p style = "color:blue">Please kindly wait until your request is being processed...</p>');

            $scope.submitData = [
                {
                    "session_code" : $scope.feed_back_session_code
                }
            ];

            $http.post(check_feedbacksession_available_api,$scope.submitData).then(
                (function(response){
                        console.log(response.data[0].feedback_count > 0);
                        if( response.data[0].feedback_count > 0 ){
                            $scope.continue_btn = {'display':'none'};
                            $scope.customNavigate($scope.feed_back_session_code);
                        }else{
                            $scope.continue_btn = {'display':''};
                            $scope.feedbacksession_waiting_message = $sce.trustAsHtml('');
                            $scope.feedbacksession_waiting_message = $sce.trustAsHtml('<p style = "color:darkred">This Session is not available. Please kindly enter another one.</p>');
                        }
                        $scope.authentication_message = $sce.trustAsHtml('');
                    }
                )
            );

            $scope.submitData = '';
            angular.element('.modal').modal('hide');
        };

        $scope.customNavigate=function(sessionCode){
            $location.path("/feedback/quiz/"+sessionCode).replace();
        }


        if($routeParams.sessionCode != ''){

            $scope.sessionCode=$routeParams.sessionCode;
            console.log($scope.sessionCode);

        }else{
            $location.path("/").replace();
        }

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
            var i;
            for (i=0; i<$scope.questions.length; i++){
                createNewFeedback($scope.questions[i]);
            }
            swal({
                title: "Feedback Session",
                text: 'Your Feedback has been saved Successfully..' +
                '<br><a href="#/feedback/quiz-main"><button type="button" id="btnB">Continue</button></a> ',
                html: true,
                showConfirmButton: false
            });
        };

        function createNewFeedback(feedbackInstance) {
            var feedback = {};
            feedback.QuestionId = feedbackInstance.qus.id;
            feedback.FeedbackSessionId = $scope.sessionCode;

            if(feedbackInstance.ans.id == 1){
                feedback.answerOneCount = 1;
                QuizService.createFeedback(feedback);
            }
            if(feedbackInstance.ans.id == 2){
                feedback.answerTwoCount = 1;
                QuizService.createFeedback(feedback,$scope.sessionCode);
            }
            if(feedbackInstance.ans.id == 3){
                feedback.answerThreeCount = 1;
                QuizService.createFeedback(feedback,$scope.sessionCode);
            }
            if(feedbackInstance.ans.id == 4){
                feedback.answerFourCount = 1;
                QuizService.createFeedback(feedback,$scope.sessionCode);
            }
            if(feedbackInstance.ans.id == 5){
                feedback.answerFiveCount = 1;
                QuizService.createFeedback(feedback,$scope.sessionCode);
            }
        }



}]);