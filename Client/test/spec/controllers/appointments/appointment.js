'use strict';

describe('Controller: AppointmentsAppointmentCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var AppointmentsAppointmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentsAppointmentCtrl = $controller('AppointmentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentsAppointmentCtrl.awesomeThings.length).toBe(3);
  });
});
