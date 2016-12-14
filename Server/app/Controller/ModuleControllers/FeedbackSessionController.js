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

    this.getAllFeedbackSessionsForReport = function(req,res) {

         connection.query(
             "SELECT CONCAT(`feedbacksession`.id,'-',`subject`.subjectCode,'-',`subject`.subjectName,' - ',`user`.userFullname) AS feed_back, feedbacksession.id AS id FROM feedbacksession INNER JOIN lecturer ON feedbacksession.LecturerId = lecturer.id INNER JOIN `user` ON lecturer.UserId = `user`.id INNER JOIN `subject` ON feedbacksession.SubjectId = `subject`.id ",
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
                        feedbackSessionStartTime : '00:00:00',
                        feedbackSessionEndTime : '00:00:00',
                        status : 0,
                        SubjectId : user.subjectId,
                        LecturerId: user.LecturerId
                    }).then(function(data) {
                        res.send({status: 1});
                    });
                })
            })
    };

    this.updateFeedbackSession = function(req,res){

        var update_property = req[0].update_property;
        var update_value = req[0].update_value;
        var row_id = req[0].row_id;
        var query_string = '';

        if(update_property == 'feedback_session_start_time')
        {
            query_string = 'UPDATE feedbacksession ' +
                           'SET feedbacksession.feedbackSessionStartTime = "'+update_value+'" ' +
                           'WHERE feedbacksession.id = '+row_id+'';
        }
        if(update_property == 'feedback_session_end_time')
        {
            query_string = 'UPDATE feedbacksession ' +
                        'SET feedbacksession.feedbackSessionEndTime = "'+update_value+'" ' +
                        'WHERE feedbacksession.id = '+row_id+'';
        }
        if(update_property == 'feedback_session_status')
        {
            if(update_value){
                update_value = 1;
            }else{
                update_value = 0;
            }

            query_string = 'UPDATE feedbacksession ' +
                        'SET feedbacksession.status = '+update_value+' ' +
                        'WHERE feedbacksession.id = '+row_id+'';
        }
        if(update_property == 'feedback_session_date')
        {
            query_string = 'UPDATE feedbacksession ' +
                        'SET feedbacksession.feedbackSessionDate = "'+update_value+'" ' +
                        'WHERE feedbacksession.id = '+row_id+'';
        }

        connection.query(query_string,
            {   type: connection.QueryTypes.BULKUPDATE }
        ).then(function(udpates) {
                        res.send({status: 1});
        });
    };

    this.checkFeedbacksessionAvailable = function(req,res){

        var session_code = req[0].session_code;

        var  query_string = "SELECT COUNT(feedbacksession.id) as feedback_count FROM feedbacksession WHERE feedbacksession.id = '"+session_code+"' AND feedbacksession.status = '1'";

        connection.query(query_string,{type: connection.QueryTypes.SELECT}
        ).then(function(sessions) {
                res.send(sessions);
            })


    };

    this.getReportForFeedbackSession = function(req,res){

        var feed_back_session_code = req.feed_back_session_code;
        var report_type = req.report_type;

        var  query_string = " SELECT"+
            " ((Count(feedback.answerOneCount)/(Count(feedback.answerOneCount) + Count(feedback.answerTwoCount) + Count(feedback.answerThreeCount) + Count(feedback.answerFourCount) + Count(feedback.answerFiveCount) )) * 100 ) AS very_poor,"+
            " ((Count(feedback.answerTwoCount)/(Count(feedback.answerOneCount) + Count(feedback.answerTwoCount) + Count(feedback.answerThreeCount) + Count(feedback.answerFourCount) + Count(feedback.answerFiveCount) )) * 100 ) AS poor,"+
            " ((Count(feedback.answerThreeCount)/(Count(feedback.answerOneCount) + Count(feedback.answerTwoCount) + Count(feedback.answerThreeCount) + Count(feedback.answerFourCount) + Count(feedback.answerFiveCount) )) * 100 ) AS good,"+
            " ((Count(feedback.answerFourCount)/(Count(feedback.answerOneCount) + Count(feedback.answerTwoCount) + Count(feedback.answerThreeCount) + Count(feedback.answerFourCount) + Count(feedback.answerFiveCount) )) * 100 ) AS very_good,"+
            " ((Count(feedback.answerFiveCount)/(Count(feedback.answerOneCount) + Count(feedback.answerTwoCount) + Count(feedback.answerThreeCount) + Count(feedback.answerFourCount) + Count(feedback.answerFiveCount) )) * 100 ) AS excellent,"+
            " question.question"+
            " FROM"+
            " feedback"+
            " LEFT JOIN question ON question.id = feedback.QuestionId"+
            " WHERE"+
            " feedback.FeedbackSessionId = '"+feed_back_session_code+"'"+
            " AND question.questionType = '"+report_type+"'"+
            " GROUP BY"+
            " feedback.QuestionId";

        connection.query(query_string,{type: connection.QueryTypes.SELECT}
        ).then(function(sessions) {
                res.send(sessions);
            })

    };
}

module.exports = new FeedbackSessionController();