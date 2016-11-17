/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */
var express = require('express');
var router = express.Router();
var StudentRoute = require('./moduleRoutes/StudentRoute');
var UserTypeRoute = require('./moduleRoutes/UserTypeRoute');
var LecturerRoute = require('./moduleRoutes/LecturerRoute');
var FacultyRoute = require('./moduleRoutes/FacultyRoute');
var SubjectRoute = require('./moduleRoutes/SubjectRoute');
var RequestRoute = require('./moduleRoutes/RequestRoute');
var QuestionRoute = require('./moduleRoutes/QuestionRoute');
var QuestionTemplateRoute = require('./moduleRoutes/QuestionTemplateRoute');
var AppointmentRoute = require('./moduleRoutes/AppointmentRoute');
var Feedback =  require('./moduleRoutes/FeedbackRoute');
var ReportRoute = require('./moduleRoutes/ReportRoute');



router.use('/student/', StudentRoute);
router.use('/userType/', UserTypeRoute);
router.use('/lecturer/', LecturerRoute);
router.use('/subject/', SubjectRoute);
router.use('/faculty/', FacultyRoute);
router.use('/request/', FacultyRoute);
router.use('/question/', QuestionRoute);
router.use('/questionTemplate/', QuestionTemplateRoute);
router.use('/request/', RequestRoute);
router.use('/appointment/', AppointmentRoute);
router.use('/feedback/',Feedback);
router.use('/reports/', ReportRoute);



module.exports = router;
