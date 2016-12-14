'use strict';

describe('Controller: AppointmentTableCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var AppointmentTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentTableCtrl = $controller('AppointmentTableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentTableCtrl.awesomeThings.length).toBe(3);
  });
});
