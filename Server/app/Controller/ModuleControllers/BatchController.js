/**
 * Created by User on 11/18/2016.
 */
var Modules = require('../../models/Models');
var Batch = Modules.Batch;
var Subject = Modules.Subject;
var Faculty = Modules.Faculty;
var Department = Modules.Department;
var Center = Modules.Center;

function BatchController() {
    this.createBatch = function(batch, res) {
        var batchInstance = {
            batchName: batch.batchName,
            batchYear: batch.batchYear,
            batchSemester: batch.batchSemester,
            batchType: batch.batchType,
            DepartmentId : batch.DepartmentId,
            CenterId : batch.CenterId,
            FacultyId : batch.FacultyId,
            batchWeek : batch.batchWeek
        }

        return Batch.create(batchInstance).then(function(instance) {
            return instance.setSubjects(batch.Subject).then(function(data) {
                if(data) {
                    return res.send(data);
                } else {
                    return res.send({'status': 500, 'message' : 'please try to add data again'})
                }
            });
        });
    }

    this.getAllBatches = function(res) {
        return Batch.findAll({
            include: [{
                model: Subject,
                attributes: ['id', 'subjectName']
            }, {
                model: Faculty,
                attributes: ['id', 'facultyName']
            }, {
                model: Department,
                attributes: ['id', 'DepartmentName']
            }, {
                model: Center,
                attributes: ['id', 'centerName']
            }]
        }).then(function(data) {
            return res.send(data);
        })
    }

    this.deleteBatch = function(batchID, res) {
        return Batch.find({
            where: {
                id: batchID
            }
        }).then(function(batch) {
            return batch.destroy().then(function(state) {
                return res.send(state);
            });
        });
    }

    this.updateBatch = function(batch, res) {
        return Batch.find({
            where: {
                id: batch.id
            }
        }).then(function(batchInstance) {
            if(batchInstance) {
                return batchInstance.update({
                    batchName: batch.batchName,
                    batchYear: batch.batchYear,
                    batchSemester: batch.batchSemester,
                    batchType: batch.batchType,
                    DepartmentId : batch.DepartmentId,
                    CenterId : batch.CenterId,
                    FacultyId : batch.FacultyId,
                    batchWeek : batch.batchWeek
                }).then(function(updatedInstance) {
                    return updatedInstance.setSubjects(batch.Subject).then(function(data) {
                        if(data) {
                            return res.send(data);
                        } else {
                            return res.send({'status': 500, 'message' : 'please try to add data again'})
                        }
                    })
                })
            }
        })
    }
}

module.exports = new BatchController();