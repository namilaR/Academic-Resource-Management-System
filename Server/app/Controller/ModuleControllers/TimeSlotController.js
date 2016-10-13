/**
 * Created by User on 9/9/2016.
 * Developer : Namila Radith
 */

var Modules = require('../../models/Models');
var TimeSlot = Modules.TimeSlot;
var moment = require('moment');

/**
 * initilize basic day object
 */
var initDays = function() {
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
    }, ];
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

TimeSlotController = function() {
    /**
     * insert new time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.saveTimeSlot = function(TimeSlotInstance, res) {
        //create new TimeSlot instanse and set parameters
        TimeSlot.create({
            day: TimeSlotInstance.dayDetails.day,
            isChecked: TimeSlotInstance.dayDetails.checked,
            fromTime: convertTo24Hours(TimeSlotInstance.slot.from),
            toTime: convertTo24Hours(TimeSlotInstance.slot.to),
            status: 1,
            hide: false,
            LecturerId: TimeSlotInstance.LecturerId
        }).then(function(data) {

            res.send(data);
        });
    };

    /**
     * returns all time slots for given lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyTimeSlots = function(TimeSlotInstance, res) {
        //get all time slots
        TimeSlot.findAll({
            where: {
                status: 1,
                LecturerId: TimeSlotInstance.id
            }

        }).then(function(data) {
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
                            id: data[j].id,
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
    /**
     * delete given time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.deleteTimeSlot = function(TimeSlotInstance, res) {
        //console.log(TimeSlotInstance);
        TimeSlot.find({
            where: {
                id: TimeSlotInstance.id
            }
        }).then(function(data) {
            if (data) {
                console.log(data);
                data.destroy().then(function(result) {
                    return res.send(result);
                });
            }
            return;
        });
    };
    /**
     * toggle visibility of given time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.toggleVisibility = function(TimeSlotInstance, res) {
        TimeSlot.update({
            hide: TimeSlotInstance.visibility
        }, {
            where: {
                id: TimeSlotInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });
    };
    /**
     * update given time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.updateTimeSlot = function(TimeSlotInstance, res) {
        console.log(TimeSlotInstance);
        TimeSlot.update({
            fromTime: convertTo24Hours(TimeSlotInstance.from),
            toTime: convertTo24Hours(TimeSlotInstance.to)
        }, {
            where: {
                id: TimeSlotInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });
    };
};
module.exports = new TimeSlotController();
