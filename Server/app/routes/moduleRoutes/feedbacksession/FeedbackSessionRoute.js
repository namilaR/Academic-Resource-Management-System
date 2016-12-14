/**
 * Created by User on 16/9/2016.
 * Developer: Kasun
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var FeedbackSessionController = ControllerMap.FeedbackSessionController;

router.get('/get-all-batches', function(req, res, next) {
    FeedbackSessionController.getBatches(req.body, res);
});
router.get('/get-all-feedback-sessions', function(req, res, next) {
    FeedbackSessionController.getAllFeedbackSessions(req.body, res);
});
router.post('/create_feedback_sessions', function(req, res, next) {
    FeedbackSessionController.createFeedbackSessions(req.body, res);
});
router.post('/update-feedback-session', function(req, res, next) {
    FeedbackSessionController.updateFeedbackSession(req.body, res);
});
router.get('/get-all-feedback-sessions-for-report', function(req, res, next) {
    FeedbackSessionController.getAllFeedbackSessionsForReport(req.body, res);
});
router.get('/check-feedbacksession-available', function(req, res, next) {
    FeedbackSessionController.checkFeedbacksessionAvailable(req.body, res);
});

module.exports = router;