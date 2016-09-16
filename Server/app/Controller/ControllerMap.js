/**
 * Created by User on 9/9/2016.
 * developer: -Amila
 * use as map for all the controllers allocating
 */
var Controllers = {};

Controllers.UserTypeController = require('./ModuleControllers/UserTypeController');
Controllers.StudentController = require('./ModuleControllers/StudentController');
Controllers.LecturerController = require('./ModuleControllers/LecturerController');
Controllers.SubjectController = require('./ModuleControllers/SubjectController');
Controllers.RequestController = require('./ModuleControllers/RequestController');
Controllers.FacultyController = require('./ModuleControllers/FacultyController');

module.exports = Controllers;

