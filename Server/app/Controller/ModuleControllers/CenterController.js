var Modules = require('../../models/Models');
var Center = Modules.Center;
var Connection = Modules.Connection;
var Subject = Modules.Subject;

CenterController = function() {
    this.createCenter = function(center, res) {
        var centerInstance = {};
        centerInstance.centerName = center.center.centerName;
        return Center.create(centerInstance).then(function(instance) {
            return instance.setSubjects(center.center.subject).then(function(data) {
                if(data) {
                    return res.send(data);
                } else {
                    return res.send({'status': 500, 'message' : 'please try to add data again'})
                }
            });
        });
    }

    this.getCenters = function(res) {
        return Center.findAll({
            include: [{
                model: Subject
            }]
        }).then(function(response) {
            if (!response.length == 0) {
                return res.send(response);
            } else {
                return res.send({'status': 500, 'message': 'no data available'});
            }
        });
    }

    this.removeCenters = function(centerId, res) {
        return Center.find({
            where: {
                id: centerId
            }
        }).then(function(center) {
            if(center) {
                return center.destroy().then(function(data) {
                    return res.send(data)
                })
            } else {
                return res({'status': 404, 'message': 'not such a object'});
            }
        });
    }
}

module.exports = new CenterController();