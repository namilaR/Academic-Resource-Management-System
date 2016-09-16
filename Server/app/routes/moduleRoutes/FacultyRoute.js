/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * developer: Amila
 */

var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var FacultyController = ControllerMap.FacultyController;

router.post('/', function(req, res, next) {
    FacultyController.create(req.body, res);
});

router.get('/', function(req, res, next) {
    FacultyController.getAllFaculty(res); 
});

router.delete('/', function(req, res, next) {
    FacultyController.deleteFaculty(req.query.facultyId, res);
});

router.put('/', function(req, res, next) {
   FacultyController.updateFaculty(req.query.facultyId, req.query.updatedName, res); 
});

module.exports = router;