/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */

/*********************************
 *      Route require Here
 *********************************/

var express = require('express');
var router = express.Router();

var FacultyRoute = require('./moduleRoutes/FacultyRoute');
var SubjectRoute = require('./moduleRoutes/SubjectRoute');
var RequestRoute = require('./moduleRoutes/RequestRoute');
var AppointmentRoute = require('./moduleRoutes/AppointmentRoute');

// route for api authentication
var ApiAuthenticationRoute = require('./moduleRoutes/authentication/ApiAuthenticationRoute');

// user management routes
var UserRoleRoute = require('./moduleRoutes/UserRoleRoute');
var UserManagementRoute = require('./moduleRoutes/userManagement/UserManagementRoute');
var StudentRoute = require('./moduleRoutes/StudentRoute');
var LecturerRoute = require('./moduleRoutes/LecturerRoute');

// Feed back routes
var FeedbackSessionRoute = require('./moduleRoutes/feedbacksession/FeedbackSessionRoute');
var Feedback =  require('./moduleRoutes/FeedbackRoute');

// questions and question template route
var QuestionRoute = require('./moduleRoutes/QuestionRoute');
 
var Appointment = require('./moduleRoutes/AppointmentRoute');

 
var QuestionTemplateRoute = require('./moduleRoutes/QuestionTemplateRoute');

// report routes
var ReportRoute = require('./moduleRoutes/ReportRoute');



/*********************************
 *      Route use Here
 *********************************/
 

router.use('/student/', StudentRoute);
router.use('/user-role/', UserRoleRoute);
router.use('/user-management/', UserManagementRoute);
router.use('/lecturer/', LecturerRoute);

router.use('/subject/', SubjectRoute);
router.use('/faculty/', FacultyRoute);
router.use('/request/', RequestRoute);
router.use('/appointment/', AppointmentRoute);

// route for api authentication
router.use('/api/authentication/', ApiAuthenticationRoute);

// Feed back routes
router.use('/feedback-session/', FeedbackSessionRoute);
router.use('/feedback/',Feedback);

// questions and question template route
router.use('/question/', QuestionRoute);
 
router.use('/appointment/', Appointment);
 
router.use('/questionTemplate/', QuestionTemplateRoute);

// report routes
router.use('/reports/', ReportRoute);
 


module.exports = router;
