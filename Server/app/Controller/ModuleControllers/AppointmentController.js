/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */
var Sequelize = require('sequelize');
var Modules = require('../../models/Models');
var Appointment = Modules.Appointment;
var Room = Modules.Room;
var Request = Modules.Request;
var Lecturer = Modules.Lecturer;

AppointmentController = function() {

    this.getAvailableRooms = function(RequestInstance, res) {
        Room.findAll().then(function(data) {
            res.send(data);

        });
    };



    this.makeAnAppointment = function(RequestInstance, res) {
        console.log(RequestInstance);
        Appointment.create(RequestInstance).then(function(data) {
            res.send(data);
            return Request.update({ status: 0 }, { where: { id: RequestInstance.RequestId } });
        });
    };

};

module.exports = new AppointmentController();
