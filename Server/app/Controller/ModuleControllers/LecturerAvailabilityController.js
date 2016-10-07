/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */

var Modules = require('../../models/Models');
var LecturerAvailability = Modules.LecturerAvailability;
var moment = require('moment');

/**
 * initilize basic day object
 */
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
/**
 * convert AM PM hour to 24type hours
 * @param  {DATE} time
 * @return {DATE}
 */
function convertTo24Hours(time) {
    return moment(time).format("HH:mm");
}
/**
 * convert 24type hour to AM PM hours
 * @param  {DATE} time
 * @return {DATE}
 */
function _24HoursToJsDateFormat(time) {
    return moment(time, 'HH:mm:ss');
}

LecturerAvailabilityController = function () {
    //insert new time slot to database
    this.saveTimeSlot = function (LecturerAvailabilityInstance, res) {
        //create new LecturerAvailability instanse and set parameters
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
    
    //return all time slots for given lecture
    this.getMyTimeSlots = function (LecturerAvailabilityInstance, res) {
        //get all time slots
        LecturerAvailability.findAll({
            where: {
                status: 1,
                LecturerId: LecturerAvailabilityInstance.id
            }

        }).then(function (data) {
            //fill days array using reytrived data
            var days = [];
            days = initDays();
            //iterate through days array
            for (var i = 0, len = days.length; i < len; i++) {
                //iterate through data array
                for (var j = 0, len2 = data.length; j < len2; j++) {
                    //if day in days equals day in data then
                    if (days[i].day === data[j].day) {
                        //day checkbox set enable
                        days[i].checked = data[j].isChecked;
                        //push new day object to day object time slot property
                        days[i].timeSlots.push({
                            //convert date values
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
