/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */
var Sequelize = require('sequelize');
var Modules = require('../../models/Models');
var Feedback = Modules.Feedback;

ReportController = function() {

    this.getChartData = function(QuestionId,RequestInstance, res) {
    	var chart_data = [];
    	Feedback.find({
            where: {
                QuestionId: QuestionId
            }
        }).then(function(data) {
            if(data) {
               chart_data.push(data['answerOneCount']!=null?data['answerOneCount']:0); 
               chart_data.push(data['answerTwoCount']!=null?data['answerTwoCount']:0); 
               chart_data.push(data['answerThreeCount']!=null?data['answerThreeCount']:0); 
               chart_data.push(data['answerFourCount']!=null?data['answerFourCount']:0); 
               chart_data.push(data['answerFiveCount']!=null?data['answerFiveCount']:0); 
               return res.send(chart_data);
            }
            return;
        });
    };


};

module.exports = new ReportController();
