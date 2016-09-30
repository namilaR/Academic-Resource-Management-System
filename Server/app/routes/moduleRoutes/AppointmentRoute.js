/**
 * Created by User on 9/16/2016.
 * Developer: Namila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var AppointmentController = ControllerMap.AppointmentController;

router.get('/get-available-rooms', function(req, res, next) {
    AppointmentController.getAvailableRooms(req,res)
});

router.get('/get-my-appointments', function(req, res, next) {
	AppointmentController.getMyAppointments(req.body,res)
    
});

router.post('/create', function(req, res, next) {
 	AppointmentController.makeAnAppointment(req.body,res)
});

router.put('/', function(req, res, next) {
    
});

router.delete('/', function(req, res, next) {
    
});

router.get('/:studentNo', function(req, res, next) {
    
});
module.exports = router;
