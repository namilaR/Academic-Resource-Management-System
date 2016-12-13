/**
 * Created by User on 9/18/2016.
 * Developer: Kasun
 */

var ControllerMap = require('../../../Controller/ControllerMap');
var UserAuthenticateController = ControllerMap.UserAuthenticateController;
var express = require('express');
var router = express.Router();


router.post('/authenticate-user', function(req,res,next) {

    UserAuthenticateController.authenticate(req.body,res);
});


module.exports = router;