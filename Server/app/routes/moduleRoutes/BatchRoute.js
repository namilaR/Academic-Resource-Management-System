/**
 * Created by User on 11/18/2016.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var BatchController = ControllerMap.BatchController;

router.post('/', function(req, res, next) {
    BatchController.createBatch(req.body, res);
});

router.get('/', function(req, res, next) {
    BatchController.getAllBatches(res);
})
module.exports = router;