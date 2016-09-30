/*
* handle the url for any get, put, post and delete request
* developer : Amila
 */

 
var express = require('express');
var router = express.Router();
var StudentRoute = require('./moduleRoutes/StudentRoute');
var UserRoleRoute = require('./moduleRoutes/UserRoleRoute');
var UserManagementRoute = require('./moduleRoutes/userManagement/UserManagementRoute');
var LecturerRoute = require('./moduleRoutes/LecturerRoute');

router.use('/student/', StudentRoute);
router.use('/user-role/', UserRoleRoute);
router.use('/user-management/', UserManagementRoute);
router.use('/lecturer/', LecturerRoute);

module.exports = router;
