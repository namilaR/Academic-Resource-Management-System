'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:FeedbackFeedbackCtrl
 * @description
 * # FeedbackFeedbackCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('QuestionTemplateCtrl', ['$scope', '$http', '$rootScope', 'DTOptionsBuilder', 'DTColumnBuilder', '$q','$compile', function($scope, $http, $rootScope, DTOptionsBuilder, DTColumnBuilder, $q,$compile) {
    this.awesomeThings = [
      '$scope',
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var get_all_questions_api = 'http://localhost:8002/question/';
    var save_question_template_api = 'http://localhost:8002/questiontemplate/';
    var get_question_template_api = 'http://localhost:8002/questionTemplate/';
    var activate_question_template_api = 'http://localhost:8002/questiontemplate/activateQuestionTemplate/';
    var update_question_template_api = 'http://localhost:8002/questiontemplate/updateTemplate/';
    var load_question_template_questions_api = 'http://localhost:8002/questiontemplate/loadQuestionTemplateQuestions/';


    $scope.questions = [];


    /*****  start creating data tables ****/
    $scope.setTableHeaders = function() {
      $scope.authorized = true;
      $scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable()
        .renderWith(function(data, type, full, meta) {
          return '<input ng-click="toggleSelection('+data.id+')"  type="checkbox" value="' + data.id + '">';
        }),
        DTColumnBuilder.newColumn('question').withTitle('Question')
      ];
      $scope.dtInstance = {};
    };

    $scope.loadAddQuestionsTable = function() {
      $scope.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
          return $http.get(get_all_questions_api).then(function(response) {
            return (response.data);
          });
        })
        .withPaginationType('full_numbers')
        .withBootstrap()
        .withOption('createdRow', function(row, data, dataIndex) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
        });
    };

    $scope.toggleSelection = function toggleSelection(value) {
      var idx = $scope.questions.indexOf(value);
      idx>-1?$scope.questions.splice(idx,1):$scope.questions.push({"id":value});
    };
    /*****  end creating data tables ****/


    $scope.setTableHeaders();
    $scope.loadAddQuestionsTable();


    /*****  start  reloading data tables ****/
    $scope.reloadData = function() {
      $scope.dtInstance.changeData($http.get(get_all_questions_api).then(function(response) {
        return (response.data);
      }));
    };

    $rootScope.$on("reloadAddQuestionsTable", function() {
      $scope.reloadData();
    });

    /*****  end  reloading data tables ****/




/**** question template submission   *****/
    $scope.submitQuestionTemplateForm = function(isValid) {
        if (isValid) {
            $scope.submit_data = {
                "templateName":$scope.templateName,
                "questions": $scope.questions
            }

            createNewQuestionTemplate($scope.submit_data);
            $scope.QuestionTemplate = '';
            $scope.questionTemplateForm.$setPristine();
        }
    };


    function createNewQuestionTemplate(questionTemplateInstance) {
        $http.post(save_question_template_api, questionTemplateInstance).then((function(data) {
            console.log(data);
        }));
    }

        /****** question template updating     *****/

    function updatingQuestionTemplate(questionTemplateInstance){


        }




        //load Question Template to data table
        function getQuestionTemplateData(){
//            QuestionTemplateService.getAllQuestionTemplates().then(function(res){
//
//                $scope.allQuestionTemplates = res.data ;
//                return res.data;
//            })
            $http.get(get_question_template_api).then((function(res) {
                $scope.allQuestionTemplates = res.data ;
                return res.data;
            }));

        }

        getQuestionTemplateData();



        //delete question template
        $scope.deleteQuestionTemplate = function(questionTemplateId ,templateName) {
            swal({
                title: "Are you sure to delete this template" + templateName,
                text: "After you delete this you have to add it again if you want",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            }, function () {
                $http.deleteQuestionTemplate(questionTemplateId).then(function (response) {

                    if (response.status === 200) {
                        swal('success', 'Delete Template', "success");
                        getQuestionTemplateData();
                    } else {
                        swal('Error', 'Not Deleted record', 'error');
                    }
                });

            });
        };


       $scope.test = function(template_id){
            console.log($scope.allQuestionTemplates[template_id]);
           $http({
               method: 'get',
               url: activate_question_template_api+template_id,
               params: template_id
           }).then(function(res) {
               console.log(res);
               $scope.allQuestionTemplates = [];
               getQuestionTemplateData();
           });

//           $http.get(activate_question_template_api+template_id).then((function(res) {
//               $scope.allQuestionTemplates = res.data ;
//               return res.data;
//           }));


       };


           $scope.loadSelectedQuestions = function(templateID){
                $http.get(load_question_template_questions_api + templateID).then((function(res) {
                    $scope.allQuestionTemplateQuestions = res.data ;
                    return res.data;
                }));
            }




            $scope.getQuestionTemplateSelectedQuestions = function(templateID) {
            $http({
                method: 'get',
                url: update_question_template_api + templateID,
                params: templateID
            }).then(function(res) {
                res.data.questions.forEach(function(data) {
                    $scope.questions.push(data);
                });
            });
        }


        /*** updating question template***/

        $scope.changeQuestionTemplate = function(isValid) {
            if (isValid) {
                $scope.submit_data = {
                    "templateName":$scope.templateName,
                    "questions": $scope.questions
                }

                createNewQuestionTemplate($scope.submit_data);
                $scope.QuestionTemplate = '';
                $scope.questionTemplateForm.$setPristine();
            }
        };


  }]);
