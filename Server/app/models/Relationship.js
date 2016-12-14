/**
 * Created by Amila on 9/7/2016.
 * Modified by Pasindu on 9/9/2016.
 * create relationship in between each models.
 */
var Models = require('./Models');
var connection = require('./Connection');
var Relationship = function() {


    /***********************************************************************
                            USER-MANAGEMENT  RELATIONSHIPS
    ***********************************************************************/
    /**added by Kasun*/

    //User Type Relationship

    Models.UserRole.hasMany(Models.User)
    Models.User.belongsTo(Models.UserRole)

    //User Management Relationship

    Models.User.hasMany(Models.Hod)
    Models.User.hasMany(Models.Student)
    Models.User.hasMany(Models.Lecturer)

    Models.Hod.belongsTo(Models.User)
    Models.Student.belongsTo(Models.User)
    Models.Lecturer.belongsTo(Models.User)

    /*********************************************************************    
    *********************************************************************/


    /***********************************************************************
                            FACULTY-MANAGEMENT  RELATIONSHIPS
    ***********************************************************************/

    Models.Hod.belongsTo(Models.Department)

    Models.Center.belongsToMany(Models.Subject, {through: 'CenterSubject'})
    Models.Subject.belongsToMany(Models.Center, {through: 'CenterSubject'})

    Models.Faculty.belongsToMany(Models.Center, {through: 'FacultyCenter'})
    Models.Center.belongsToMany(Models.Faculty, {through: 'FacultyCenter'})

    Models.Faculty.hasMany(Models.Department)
    Models.Department.belongsTo(Models.Faculty)

    Models.Department.hasMany(Models.Batch)
    Models.Batch.belongsTo(Models.Department)

    Models.Center.hasMany(Models.Batch)
    Models.Batch.belongsTo(Models.Center)

    Models.Faculty.hasMany(Models.Batch)
    Models.Batch.belongsTo(Models.Faculty)

    Models.Batch.hasMany(Models.Student)
    Models.Student.belongsTo(Models.Batch)

    Models.Department.hasMany(Models.Batch);
    Models.Batch.belongsTo(Models.Department);

    Models.Subject.belongsToMany(Models.Batch, {through: 'BatchSubject'})
    Models.Batch.belongsToMany(Models.Subject, {through: 'BatchSubject'})

    Models.Batch.hasMany(Models.Student);
    Models.Student.belongsTo(Models.Batch);

    Models.Lecturer.belongsToMany(Models.Batch, {through: 'LecturerBatch'})
    Models.Batch.belongsToMany(Models.Lecturer, {through: 'LecturerBatch'})

    Models.Room.belongsTo(Models.Faculty)

    Models.Subject.belongsToMany(Models.Lecturer,{through: 'SubjectLecturer'});
    Models.Lecturer.belongsToMany(Models.Subject,{through: 'SubjectLecturer'});

    /*********************************************************************    
    *********************************************************************/


    /***********************************************************************
                            APPOINMENTS RELATIONSHIPS
    ***********************************************************************/
    Models.Student.hasMany(Models.Appointment);
    Models.Appointment.belongsTo(Models.Student);

    Models.TimeSlot.hasMany(Models.Appointment);
    Models.Appointment.belongsTo(Models.TimeSlot);

    Models.Lecturer.hasMany(Models.TimeSlot);
    Models.TimeSlot.belongsTo(Models.Lecturer);

    Models.Appointment.belongsTo(Models.Room);

    /*********************************************************************
    *********************************************************************/



    /***********************************************************************
                            FEED-BACK_MANAGEMENT RELATIONSHIPS
    ***********************************************************************/

    Models.Hod.hasMany(Models.FeedBackSession)
    Models.FeedBackSession.belongsTo(Models.Hod)

    Models.FeedBackSession.hasMany(Models.Feedback)
    Models.Feedback.belongsTo(Models.FeedBackSession)

    Models.Subject.hasMany(Models.FeedBackSession)
    Models.FeedBackSession.belongsTo(Models.Subject)

    Models.Question.hasMany(Models.Feedback)
    Models.Feedback.belongsTo(Models.Question)

    /**added by pasindu*/
    Models.Lecturer.hasMany(Models.FeedBackSession)
    Models.FeedBackSession.belongsTo(Models.Lecturer)

    Models.FeedBackSession.belongsTo(Models.Subject) 

    Models.FeedBackSession.belongsTo(Models.Center)

    Models.FeedBackSession.belongsTo(Models.Faculty)

    Models.FeedBackSession.belongsTo(Models.Department)

    Models.FeedBackSession.belongsTo(Models.Batch)

    Models.Lecturer.hasMany(Models.FeedBackSession);
    Models.FeedBackSession.belongsTo(Models.Lecturer);


    Models.Lecturer.hasMany(Models.FeedBackSession);
    Models.FeedBackSession.belongsTo(Models.Lecturer);



    Models.FeedBackSession.belongsTo(Models.Subject);    

    Models.FeedBackSession.belongsTo(Models.Center);

    Models.FeedBackSession.belongsTo(Models.Faculty);

    Models.FeedBackSession.belongsTo(Models.Department);

    Models.FeedBackSession.belongsTo(Models.Batch);

    Models.QuestionTemplate.belongsToMany(Models.Question, {
       through: 'QuestionTemplateQuestion'
    });
    Models.Question.belongsToMany(Models.QuestionTemplate, {
        through: 'QuestionTemplateQuestion'
    });

    /*********************************************************************
    *********************************************************************/

    connection
        .sync()
        .then(function(err) {
            console.log("Database created");
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
};

module.exports = new Relationship();