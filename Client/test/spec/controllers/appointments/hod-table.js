'use strict';

describe('Controller: AppointmentsHodTableCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var AppointmentsHodTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentsHodTableCtrl = $controller('AppointmentsHodTableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentsHodTableCtrl.awesomeThings.length).toBe(3);
  });
});
