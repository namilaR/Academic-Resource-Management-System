'use strict';

describe('Controller: RequestTableCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var AppointmentsRequestTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentsRequestTableCtrl = $controller('RequestTableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentsRequestTableCtrl.awesomeThings.length).toBe(3);
  });
});
