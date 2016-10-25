var Modules = require('../../models/Models');
var Question = Modules.Question;
var FeedBackTypes = Modules.FeedBackTypes;
var QuestionTemplate = Modules.QuestionTemplate;

QuestionController = function() {
    this.create = function(questionInstance, response) {
        Question.create(questionInstance).then(function(result) {
            response.send(result);
        });
    };

    this.get = function(res) {
        Question.findAll().then(function(data) {
            res.send(data);
        });
    };


    this.getAvailableQuiz = function(res) {

        Question.findAll().then(function(ques) {
            var aa = [];
            for (var i in ques) {
                aa.push({
                    qus: ques[i],
                    ans: {}
                });
            }
            res.send(aa);
        });


    };


    this.update = function(questionInstance, id, res) {
        console.log(questionInstance);
        Question.find({
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


    this.delete = function(questionId, res) {
        Question.find({
            where: {
                id: questionId
            }
        }).then(function(data) {
            data.destroy().then(function(response) {
                return res.send(response);
            });
        });
    };



    this.getAllQuestionsInTemplate = function(RequestInstance, res) {
        console.log(RequestInstance);
        QuestionTemplate.findAll({
            where: {
                status: 1
            },
            include: [{
                model: Room,
                where: {
                    id: Sequelize.col('Appointment.RoomId')
                }
            }, {
                model: Request,
                where: {
                    //id: Sequelize.col('Appointment.RequestId'),
                    LecturerId: RequestInstance.id,
                }
            }]
        }).then(function(data) {
            res.send(data);

        });
    };







};

module.exports = new QuestionController();
