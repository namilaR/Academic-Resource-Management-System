var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var FeedbackController = ControllerMap.FeedbackController;

router.post('/', function(req, res, next) {
    FeedbackController.create(req.body, res);
});

router.get('/', function(req, res, next) {
    FeedbackController.get(res);
});


router.delete('/', function(req, res, next) {
    FeedbackController.delete(req.query.questionId, res);
});

router.put('/', function(req, res, next) {
    FeedbackController.update(req.query.question, req.query.id, res);
});

module.exports = router;
