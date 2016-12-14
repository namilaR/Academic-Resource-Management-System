process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../app.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Create appointment request for student id 1', function () {
    var appointmentReq = {
        "SubjectId":"1",
        "LecturerId":"1",
        "selectedDate":"2016-11-28T18:30:00.000Z",
        "selectedTimeSlot":{
            "id":3,
            "day":"Tuesday",
            "fromTime":"08:00 AM",
            "toTime":"08:15 AM",
            "status":true,
            "hide":false,
            "isChecked":true,
            "createdAt":"2016-11-20T11:06:55.000Z",
            "updatedAt":"2016-11-22T23:06:02.000Z",
            "deletedAt":null,
            "LecturerId":1,
            "$$hashKey":"object:338"
        },
        "requestTitle":"test 01 title",
        "requestSmallBref":"test 01 description",
        "student":{
            "full_name":"stu01",
            "username":"stu01",
            "email":"1234",
            "usertype":"Student",
            "userId":4,
            "iat":1479944123,
            "exp":1479944723
        }
    };

    it('should create appointment request for student id 1', function (done) {
        chai.request(server)
            .post('/appointment/save-appointment-request')
            .send(appointmentReq)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });
})

describe('Load all appointments by student id 1', function () {
    it('should display all appointments by student id 1', function (done) {
        chai.request(server)
            .get('/appointment/get-my-appointments')
            .query({userId: 4})
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    });

});