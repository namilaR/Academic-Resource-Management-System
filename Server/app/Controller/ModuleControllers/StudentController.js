/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */
var Modules = require('../../models/Models');
var Student = Modules.Student;

StudentController = function() {
    this.get = function(res) {
        Student.findAll({
            where: {
                status: 1
            }
        }).then(function(data) {
            res.send(data);
        });
    };
    
    this.create = function(StudentInstance, res) {
        Student.create(StudentInstance).then(function(data) {
            res.send(data);
        });
    };

    this.update = function(StudentInstance, res) {
        Student.update({
            studentFullName: StudentInstance.studentFullName
        }, {
            where: {
                studentDitNo: StudentInstance.studentDitNo
            }
        }).then(function(data) {
            res.send(data)
        });
    };

    this.delete = function(StudentInstance, res) {
        Student.destroy({
            where: {
                studentDitNo: StudentInstance.studentDitNo
            }
        }).then(function(err,data) {
            if(err) {
                res.send({status: 400, message:"Error goig on"});
            } else {
                res.send({status:200, message:"successfully deleted"});
            }
        });
    };

    this.getStudent = function(StudentNo, res) {
        Student.find({
            where: {
                studentDitNo: StudentNo
            }
        }).then(function(data) {
            res.send(data);
        });
    };
};

module.exports = new StudentController();