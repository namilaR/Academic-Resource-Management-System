/**
 * Created by User on 9/18/2016.
 * Developer :- Kasun
 */
var Module = require('../../models/Models');
var Batch = Module.Batch;
var FeedBackSession = Module.FeedBackSession;
var connection = require('../../models/Connection');
var Sequelize = require('sequelize');

function FeedbackSessionController() {

    this.getBatches = function(req,res) {

        Batch.findAll().then(function(data) {
                res.send(data);
            });

    };
     this.getAllFeedbackSessions = function(req,res) {

         connection.query(
             "SELECT feedbacksession.id, feedbacksession.feedbackSessionDate, feedbacksession.feedbackSessionStartTime, feedbacksession.feedbackSessionEndTime, feedbacksession.`status`, `subject`.subjectName, `user`.userFullname FROM feedbacksession LEFT JOIN `subject` ON feedbacksession.SubjectId = `subject`.id INNER JOIN lecturer ON feedbacksession.LecturerId = lecturer.id INNER JOIN `user` ON lecturer.UserId = `user`.id",
             {type: connection.QueryTypes.SELECT}
         ).then(function(sessions) {
                 res.send(sessions);
             })

    };

    this.createFeedbackSessions = function(req,res) {
        connection.query("SELECT batchsubject.subjectId,  subjectlecturer.LecturerId FROM  batchsubject INNER JOIN subjectlecturer ON batchsubject.subjectId = subjectlecturer.SubjectId WHERE batchsubject.batchId = ?",
            { replacements:[req[0].batch], type: connection.QueryTypes.SELECT}
        ).then(function(users) {
                var today = new Date();
                users.forEach(function (user) {
                    console.log(user.subjectId);
                    FeedBackSession.create({
                        feedbackSessionDate : today,
                        feedbackSessionStartTime : '00:00:00 PM',
                        feedbackSessionEndTime : '00:00:00 PM',
                        status : 0,
                        SubjectId : user.subjectId,
                        LecturerId: user.LecturerId
                    }).then(function(data) {
                        res.send({status: 1});
                    });
                })
            })
    };
}

module.exports = new FeedbackSessionController();