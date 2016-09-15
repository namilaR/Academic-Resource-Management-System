'use strict';

describe('Service: appointmentDataservice', function () {

  // load the service's module
  beforeEach(module('armsAngularApp'));

  // instantiate service
  var appointments/appointmentDataservice;
  beforeEach(inject(function (_appointments/appointmentDataservice_) {
    appointments/appointmentDataservice = _appointments/appointmentDataservice_;
  }));

  it('should do something', function () {
    expect(!!appointments/appointmentDataservice).toBe(true);
  });

});
