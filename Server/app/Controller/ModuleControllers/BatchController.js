/**
 * Created by User on 11/18/2016.
 */
var Modules = require('../../models/Models');
var Batch = Modules.Batch;

function BatchController() {
    this.createBatch = function(batch, res) {
        var batchInstance = {
            batchName: batch.batchName,
            batchYear: batch.batchYear,
            batchSemester: batch.batchSemester,
            batchType: batch.batchType,
            DepartmentId : batch.DepartmentId,
            CenterId : batch.CenterId,
            FacultyId : batch.FacultyId
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
}

module.exports = new BatchController();