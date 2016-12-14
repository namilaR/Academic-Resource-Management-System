/**
 * Created by User on 9/18/2016.
 * Developer: Kasun
 */

var ControllerMap = require('../../Controller/ControllerMap');
var UserRoleController = ControllerMap.UserRoleController;
var express = require('express');
var router = express.Router();



/*
 * indexpage path for user type to get all the types
 * @req -> client request
 * @res -> client response
 * @next -> call back method
 */
router.get('/get-all-user-types', function(req,res,next) {
    UserRoleController.get(res);
});


/*
 * url for insert user type by using post request
 * @req -> client request
 * @res -> client response
 * @next -> call back method
 */
router.post('/add-new-user-type', function(req, res, next) {
    UserRoleController.create(req.body, res);
});


/*
 * url for update  user type by using put request
 * @req -> client request
 * @res -> client response
 * @next -> call back method
 */
router.put('/', function(req, res, next) {
    UserRoleController.update(req.body, res);
});


/*
 * url for delete  user type by using delete put request
 * @req -> client request
 * @res -> client response
 * @next -> call back method
 */
router.delete('/', function(req, res,next) {
    UserRoleController.delete(req.body, res);
});

module.exports = router;