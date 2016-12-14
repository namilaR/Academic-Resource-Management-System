/**
 * Created by User on 11/18/2016.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var DepartmentController = ControllerMap.DepartmentControlller;

router.post('/', function(req, res, next) {
    DepartmentController.createDepartment(req.body, res);
});

router.get('/', function(req, res, next) {
    DepartmentController.getDepartments(res);
});

router.delete('/:id', function(req, res, next) {
    DepartmentController.deleteDepartment(req.params.id, res);
});

router.put('/', function(req, res, next) {
    DepartmentController.updateDepartment(req.body, res);
});

module.exports = router;