/**
 * Created by Pasindu on 10/10/2016.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var QuestionTemplateController = ControllerMap.QuestionTemplateController;


router.get('/activateQuestionTemplate/:id', function(req, res, next) {
    QuestionTemplateController.activateQuestionTemplate(req.params.id,res);
});

router. post('/', function(req, res, next) {
    QuestionTemplateController.create(req.body, res);
});

router.get('/', function(req, res, next) {
    QuestionTemplateController.get(res);
});

router.delete('/', function(req, res, next) {
    QuestionTemplateController.delete(req.query.questionId, res);
});

router.put('/', function(req, res, next) {
    QuestionTemplateController.update(req.query.question, req.query.id, res);
});


router.post('/updateTemplate/:id', function(req, res, next) {
    QuestionTemplateController.updateTemplate(req.params.id,req.body, res);
});

router.get('/loadQuestionTemplateQuestions/:id', function(req, res, next) {
    QuestionTemplateController.loadQuestionTemplateQuestions(req.params.id, res);
});

module.exports = router;
