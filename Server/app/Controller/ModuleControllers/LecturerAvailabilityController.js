/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */

var Modules = require('../../models/Models');
var LecturerAvailability = Modules.LecturerAvailability;
var moment = require('moment');


var initDays = function () {
    return [{
        day: 'Monday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Tuesday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Wednesday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Thursday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Friday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Saturday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Sunday',
        checked: false,
        timeSlots: []
    },];
};

function convertTo24Hours(time) {
    return moment(time).format("HH:mm");
}

function _24HoursToJsDateFormat(time) {
    return moment(time, 'HH:mm:ss');
}

LecturerAvailabilityController = function () {
    this.saveTimeSlot = function (LecturerAvailabilityInstance, res) {
        ///console.log(LecturerAvailabilityInstance);
        console.log(convertTo24Hours(LecturerAvailabilityInstance.slot.from));
        LecturerAvailability.create({
            day: LecturerAvailabilityInstance.dayDetails.day,
            isChecked: LecturerAvailabilityInstance.dayDetails.checked,
            fromTime: convertTo24Hours(LecturerAvailabilityInstance.slot.from),
            toTime: convertTo24Hours(LecturerAvailabilityInstance.slot.to),
            status: 1,
            hide: false,
            LecturerId: LecturerAvailabilityInstance.LecturerId
        }).then(function (data) {

            res.send(data);
        });
    };

    this.getMyTimeSlots = function (LecturerAvailabilityInstance, res) {
        LecturerAvailability.findAll({
            where: {
                status: 1,
                LecturerId: LecturerAvailabilityInstance.id
            }

        }).then(function (data) {
            var days = [];
            days = initDays();
            for (var i = 0, len = days.length; i < len; i++) {
                for (var j = 0, len2 = data.length; j < len2; j++) {
                    if (days[i].day === data[j].day) {
                        days[i].checked = data[j].isChecked;
                        days[i].timeSlots.push({
                            from: _24HoursToJsDateFormat(data[j].fromTime),
                            to: _24HoursToJsDateFormat(data[j].toTime),
                            status: data[j].status,
                            visibility: data[j].hide,
                        });
                    }
                }
            }

            res.send(days);

        });
    };
};
module.exports = new LecturerAvailabilityController();
