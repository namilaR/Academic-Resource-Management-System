/**
 * Created by User on 9/16/2016.
 * Developer: Namila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var ReportController = ControllerMap.ReportController;

router.get('/getChartData', function(req, res, next) {
    ReportController.getChartData(req.query.questionId,req,res)
});



module.exports = router;
