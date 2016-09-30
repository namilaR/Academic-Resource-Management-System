/**
 * Created by User on 9/9/2016.
 * Developer: Amila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var SubjectController = ControllerMap.SubjectController;

router.get('/', function(req, res, next) {
    SubjectController.get(res);
});
module.exports = router;
