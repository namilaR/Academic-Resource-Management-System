var Modules = require('../../models/Models');
var Helper = require('../../models/Helper');
var Sequelize = require('sequelize');
var Appointment = Modules.Appointment;
var TimeSlot = Modules.TimeSlot;
var Student = Modules.Student;

/**
 * convert JS date to SQL date
 * @param  {DATE} time
 * @return {DATE}
 */
function JSDateToSQLDate(date) {
    return moment(date).format("YYYY-MM-DD");
}

AppointmentController = function() {
  /**
   * save new appointment request
   * @param  {REQUEST},{RESPONSE}
   * @return {RESPONSE}
   */
  this.saveAppoinmentRequest = function (AppoinmnInstance, res){
    Appointment.create({
      appointmentDate:Helper.JSDateToSQLDate(AppoinmnInstance.selectedDate),
      appointmentTitle:AppoinmnInstance.requestTitle,
      appointmentSmallBref:AppoinmnInstance.requestSmallBref,
      status: 1,
      approved: 0,
      reShedule:0,
      cancel:0,
      StudentId: AppoinmnInstance.student.id,
      TimeSlotId:AppoinmnInstance.selectedTimeSlot.id
    }).then(function(data) {

        res.send(data);
    });
  };

  this.getMyAllAppoinments = function(StudentInstance, res){
    Appointment.findAll({
      where: {
          status: 1,
          StudentId: StudentInstance.id,
          //StudentId: 1,
        },
        include: [{
            model: TimeSlot,
            where: { id: Sequelize.col('Appointment.TimeSlotId') }
        }]

    })
    .then(function(data){
      res.send(data);
    });
  };

  this.getAnPendingAppoinment = function(AppoimnetInstance, res){
    Appointment.find({
      where: {
          status: 1,
          //id: AppoimnetInstance.id,
          id: 18,
        },
        include: [
          {
            model: TimeSlot,
            where: { id: Sequelize.col('Appointment.TimeSlotId') }
        },
        {
          model: Student,
          where: { id: Sequelize.col('Appointment.StudentId') }
        }
      ]

    })
    .then(function(data){
      res.send(data);
    });
  };

  this.getMyAllPendingAppoinments = function(LectureInstance, res){
    Appointment.findAll({
      where: {
          status: 1,
          approved : 0,
          TimeSlotId:{
            $in:[Sequelize.literal ("SELECT timeSlot.id 	FROM timeSlot WHERE timeSlot.LecturerId = '"+LectureInstance.id+"'")]
          }
        },
        include: [{
            model: TimeSlot,
            where: { id: Sequelize.col('Appointment.TimeSlotId') }
        }]

    })
    .then(function(data){
      res.send(data);
    });
  };

};

module.exports = new AppointmentController();
