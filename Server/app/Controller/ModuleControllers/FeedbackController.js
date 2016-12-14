var Modules = require('../../models/Models');
var Feedback = Modules.Feedback

FeedbackController = function() {



    this.create = function(feedbackInstance, response) {
        Feedback.create(feedbackInstance).then(function(result) {
            response.send(result);
        });
    };





    this.update = function(feedbackInstance, id, res) {
        console.log(feedbackInstance);
        Feedback.find({
            where: {
                id: id
            }
        }).then(function(question) {
            question.update({
                question: questionInstance
            }).then(function(result) {
                res.send(result);
            });
        });
    };

};

module.exports = new FeedbackController();
