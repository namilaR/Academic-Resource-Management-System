



angular.module('armsAngularApp')
    .controller('QuizCtrl',['$scope','$http','$sce','QuizService','DTOptionsBuilder', 'DTColumnBuilder',  function ($scope ,$http,$sce,QuizService, DTOptionsBuilder, DTColumnBuilder) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        // Main Quiz

        $scope.feedbacksession_waiting_message = $sce.trustAsHtml('');
        $scope.feedbacksession_message = $sce.trustAsHtml('');
        $scope.feed_back_session_code = '';
        var check_feedbacksession_available_api = 'http://localhost:8002/feedback-session/check-feedbacksession-available';


        $scope.authenticateFeedbackSession = function(){
            $scope.login_btn = {'display':'none'};
            $scope.feedbacksession_waiting_message = $sce.trustAsHtml('<p style = "color:blue">Please kindly wait until your request is being processed...</p>');

            $scope.submitData = [
                {
                    "session_code" : $scope.feed_back_session_code
                }
            ];

            alert($scope.feed_back_session_code);



            return $http.get(check_feedbacksession_available_api).then(function(response){
                //if( response.data == '[]'){
                //    console.log(response.data);
                //}else{
                //    console.log( "sucess");
                //}
                console.log(response.data);


                $scope.authentication_message = $sce.trustAsHtml('');
            });


            //AuthenticationService.login($scope.submitData).then(function(success) {
            //    $scope.waiting_message = $sce.trustAsHtml('<p style = "color:blue"></p>');
            //}, function(errMsg) {
            //    $scope.authentication_message = $sce.trustAsHtml('<p style = "color:red" >Login Unsuccessfull. Please try again.</p>');
            //    $scope.login_btn = {'display':'block'};
            //    $scope.waiting_message = $sce.trustAsHtml('');
            //});

            $scope.submitData = '';
            angular.element('.modal').modal('hide');
        };



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