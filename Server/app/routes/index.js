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

router.use('/student/', StudentRoute);
router.use('/userType/', UserTypeRoute);
router.use('/lecturer/', LecturerRoute);
router.use('/faculty/', FacultyRoute);

module.exports = router;
