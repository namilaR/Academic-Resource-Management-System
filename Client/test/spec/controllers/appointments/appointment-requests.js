'use strict';

describe('Controller: AppointmentRequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var AppointmentRequestsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentRequestsCtrl = $controller('AppointmentRequestsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentRequestsCtrl.awesomeThings.length).toBe(3);
  });
});
