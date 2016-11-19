/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */

 
var express = require('express');
var router = express.Router();
var StudentRoute = require('./moduleRoutes/StudentRoute');
var UserRoleRoute = require('./moduleRoutes/UserRoleRoute');
var UserManagementRoute = require('./moduleRoutes/userManagement/UserManagementRoute');
var FeedbackSessionRoute = require('./moduleRoutes/feedbacksession/FeedbackSessionRoute');
var LecturerRoute = require('./moduleRoutes/LecturerRoute');
var FacultyRoute = require('./moduleRoutes/FacultyRoute');
var SubjectRoute = require('./moduleRoutes/SubjectRoute');
var RequestRoute = require('./moduleRoutes/RequestRoute');
var AppointmentRoute = require('./moduleRoutes/AppointmentRoute');
// route for api authentication
var ApiAuthenticationRoute = require('./moduleRoutes/authentication/ApiAuthenticationRoute');

router.use('/student/', StudentRoute);
router.use('/user-role/', UserRoleRoute);
router.use('/user-management/', UserManagementRoute);
router.use('/lecturer/', LecturerRoute);
router.use('/subject/', SubjectRoute);
router.use('/faculty/', FacultyRoute);
router.use('/request/', RequestRoute);
router.use('/appointment/', AppointmentRoute);
router.use('/api/authentication/', ApiAuthenticationRoute);
router.use('/feedback-session/', FeedbackSessionRoute);



module.exports = router;
