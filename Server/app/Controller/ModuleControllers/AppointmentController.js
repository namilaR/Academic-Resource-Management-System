var Modules = require('../../models/Models');
var Helper = require('../../models/Helper');
var Sequelize = require('sequelize');
var Appointment = Modules.Appointment;
var TimeSlot = Modules.TimeSlot;
var User = Modules.User;
var Student = Modules.Student;
var Lecturer = Modules.Lecturer;
var Room = Modules.Room;

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
    this.saveAppoinmentRequest = function(AppoinmnInstance, res) {
        Student.findOne({
            where: {
              status: 1,
              UserId: AppoinmnInstance.userId              
            }
        }).then(function(data) {
            Appointment.create({
                appointmentDate: Helper.JSDateToSQLDate(AppoinmnInstance.selectedDate),
                appointmentTitle: AppoinmnInstance.requestTitle,
                appointmentSmallBref: AppoinmnInstance.requestSmallBref,
                status: 1,
                approved: 0,
                reShedule: 0,
                cancel: 0,
                StudentId: data.id,
                TimeSlotId: AppoinmnInstance.selectedTimeSlot.id
            }).then(function(data) {

                res.send(data);
            });
        });

    };
    /**
     * returns all appoinments by the student
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyAllAppoinments = function(UserInstance, res) {
            Student.findOne({
                where: {
                  status: 1,
                  UserId: UserInstance.userId
                }
            }).then(function(data) {
                Appointment.findAll({
                        where: {
                            status: 1,
                            StudentId: data.id,
                            //StudentId: 1,
                        },
                        include: [{
                            model: TimeSlot,
                            where: {
                                id: Sequelize.col('Appointment.TimeSlotId')
                            }
                        }]

                    })
                    .then(function(data) {
                        res.send(data);
                    });
            });
    };
    /**
     * returns selected pending appoinments to lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getAnPendingAppoinment = function(AppoimnetInstance, res) {
        Appointment.find({
                where: {
                    status: 1,
                    id: AppoimnetInstance.id,
                },
                include: [{
                    model: TimeSlot,
                    where: {
                        id: Sequelize.col('Appointment.TimeSlotId')
                    }
                }, {
                    model: Student,
                    where: {
                        id: Sequelize.col('Appointment.StudentId')
                    },
                    include: [{
                        model: User,
                        where: {
                            id: Sequelize.col('Student.UserId')
                        },
                    }]
                }]

            })
            .then(function(data) {

                res.send(data);
            });
    };
    /**
     * returns all pending appointments to lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyAllPendingAppoinments = function(LectureInstance, res) {
        Lecturer.findOne({
          where: {
            status: 1,
            UserId: LectureInstance.userId
          }
        }).then(function(data) {
            Appointment.findAll({
                    where: {
                        status: 1,
                        approved: 0,
                        TimeSlotId: {
                            $in: [Sequelize.literal("SELECT timeSlot.id 	FROM timeSlot WHERE timeSlot.LecturerId = '" + data.id + "'")]
                        }
                    },
                    include: [{
                        model: TimeSlot,
                        where: {
                            id: Sequelize.col('Appointment.TimeSlotId')
                        }
                    }]

                })
                .then(function(data) {
                    res.send(data);
                });
        });
    };
    /**
     * returns all apprived appointments to lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyAllApprovedAppoinments = function(LectureInstance, res) {
      Lecturer.findOne({
          where: {
            status: 1,
            UserId: LectureInstance.userId
          }
      }).then(function(data) {
        Appointment.findAll({
                where: {
                    status: 1,
                    approved: 1,
                    TimeSlotId: {
                        $in: [Sequelize.literal("SELECT timeSlot.id 	FROM timeSlot WHERE timeSlot.LecturerId = '" + data.id + "'")]
                    }
                },
                include: [{
                    model: TimeSlot,
                    where: {
                        id: Sequelize.col('Appointment.TimeSlotId')
                    }
                }, {
                    model: Student,
                    where: {
                        id: Sequelize.col('Appointment.StudentId')
                    }
                }, {
                    model: Room,
                    where: {
                        id: Sequelize.col('Appointment.RoomId')
                    }
                }]

            })
            .then(function(data) {
                res.send(data);
            });
      });
    };
    /**
     * returns all available rooms
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getAllAvailableRooms = function(AppoinmentInstance, res) {
        console.log(AppoinmentInstance);
        var timeSlot = JSON.parse(AppoinmentInstance.timeSlot);
        console.log(Helper.JSDateToSQLDate(AppoinmentInstance.appointmentDate));
        Room.findAll({
                where: {
                    status: 1,
                    id: {
                        $notIn: [Sequelize.literal("SELECT a.RoomId	FROM appointment a	WHERE a.TimeSlotId = '" + timeSlot.id + "' AND a.appointmentDate = '" + Helper.JSDateToSQLDate(AppoinmentInstance.appointmentDate) + "' AND a.RoomId IS NOT NULL")]
                    }
                }

            })
            .then(function(data) {
                res.send(data);
            });
    };
    /**
     * create an appointment
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.makeAppoinment = function(AppoinmentInstance, res) {
        //var room = JSON.parse(AppoinmentInstance.selectedRoom);
        Appointment.update({
            RoomId: AppoinmentInstance.selectedRoom.id,
            approved: 1
        }, {
            where: {
                id: AppoinmentInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });
    };

};

module.exports = new AppointmentController();
