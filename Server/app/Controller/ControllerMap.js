/**
 * Created by User on 9/9/2016.
 * developer: -Amila
 * use as map for all the controllers allocating
 */
var Controllers = {};

Controllers.UserController = require('./ModuleControllers/UserController');
Controllers.UserRoleController = require('./ModuleControllers/UserRoleController');
Controllers.StudentController = require('./ModuleControllers/StudentController');
Controllers.LecturerController = require('./ModuleControllers/LecturerController');

module.exports = Controllers;