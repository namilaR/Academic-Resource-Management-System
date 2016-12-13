/**
 * Created by User on 9/9/2016.
 * developer: -Amila
 * use as map for all the controllers allocating
 */
var Controllers = {};

 
 
Controllers.StudentController = require('./ModuleControllers/StudentController');
Controllers.LecturerController = require('./ModuleControllers/LecturerController');
Controllers.TimeSlotController = require('./ModuleControllers/TimeSlotController');
 
Controllers.SubjectController = require('./ModuleControllers/SubjectController');
Controllers.RequestController = require('./ModuleControllers/RequestController');
Controllers.FacultyController = require('./ModuleControllers/FacultyController');
Controllers.AppointmentController = require('./ModuleControllers/AppointmentController');

//User authentication Controller
Controllers.UserAuthenticateController = require('./ModuleControllers/UserAuthenticateController');

//User management controller
Controllers.UserController = require('./ModuleControllers/UserController');
Controllers.UserRoleController = require('./ModuleControllers/UserRoleController');
Controllers.StudentController = require('./ModuleControllers/StudentController');
Controllers.LecturerController = require('./ModuleControllers/LecturerController');

//Feedback session and feedback controller
Controllers.FeedbackSessionController = require('./ModuleControllers/FeedbackSessionController');
Controllers.FeedbackController = require('./ModuleControllers/FeedbackController');

//Question and Question Template controller
Controllers.QuestionController = require('./ModuleControllers/QuestionController');
 
Controllers.AppointmentController = require('./ModuleControllers/AppointmentController');
Controllers.RoomController = require('./ModuleControllers/RoomController');


 
Controllers.QuestionTemplateController = require('./ModuleControllers/QuestionTemplateController');

//Report controller
Controllers.ReportController = require('./ModuleControllers/ReportController');
 

module.exports = Controllers;
