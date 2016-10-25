/**
 * Created by Pasindu on 10/10/2016.
 */
var Modules = require('../../models/Models');
var QuestionTemplate = Modules.QuestionTemplate;
var Question = Modules.Question;
var Sequelize = require('sequelize');
var connection = require('../../models/Connection');

QuestionTemplateController = function() {

    this.create = function(questionInstance, response) {
        QuestionTemplate.create({
            templateName: questionInstance.templateName
        }).then(function(template) {
            var ques = [];
            for (var val in questionInstance.questions) {
                var que = Question.build({
                    id: questionInstance.questions[val].id
                });
                ques.push(que);
            }
            template.addQuestions(ques).then(function() {
                //return success//
            });

        });
    };

    this.get = function(res) {
        QuestionTemplate.findAll().then(function(data) {
            res.send(data);
        });
    };


    this.update = function(questionInstance, id, res) {
        console.log(questionInstance);
        QuestionTemplate.find({
            where: {
                id: id
            }
        }).then(function(QuestionTemplate) {
            QuestionTemplate.update({
                question: questionInstance
            }).then(function(result) {
                res.send(result);
            });
        });
    };




    this.delete = function(questionId, res) {
        QuestionTemplate.find({
            where: {
                id: questionId
            }
        }).then(function(data) {
            data.destroy().then(function(response) {
                return res.send(response);
            });
        });
    };



    this.activateQuestionTemplate = function(questionID, res) {
        return QuestionTemplate.find({
            where: {
                status: true
            }
        }).then(function(data) {
            return QuestionTemplate.update({
                status: false
            }, {
                where: {
                    id: data.id
                }
            });
        }).then(function(result) {
            if (result) {
                return QuestionTemplate.update({
                    status: true
                }, {
                    where: {
                        id: questionID
                    }
                });
            }
        }).then(function(result) {
            return res.send(result);
        });
    };

    this.updateTemplate = function(tempId, res) {

        QuestionTemplate.find({
            where: {
                id: tempId
            }
        }).then(function(result) {

            QuestionTemplate = result;
            QuestionTemplate.getQuestions().then(function(associatedquestions) {
                var questionObj = {};
                questionObj.templateName = result.templateName;
                questionObj.questions = associatedquestions;
                return res.send(questionObj);
            });
        });

    };

    this.loadQuestionTemplateQuestions = function(tempId, res) {
        connection.query(
            'SELECT question.id, question.question, CASE WHEN selected.QuestionId = question.id THEN "1" ELSE "0" END AS STATUS FROM question LEFT JOIN ( SELECT questiontemplatequestion.QuestionId FROM questiontemplatequestion WHERE questiontemplatequestion.QuestionTemplateId = ? ) selected ON question.id = selected.QuestionId ORDER BY question.id', {
                replacements: [tempId],
                type: connection.QueryTypes.SELECT
            }
        ).then(function(questions) {
            return res.send(questions);
        });
    };
};

module.exports = new QuestionTemplateController();
