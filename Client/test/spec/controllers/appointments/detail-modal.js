'use strict';

describe('Controller: AppointmentsDetailModalCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var AppointmentsDetailModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentsDetailModalCtrl = $controller('AppointmentsDetailModalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentsDetailModalCtrl.awesomeThings.length).toBe(3);
  });
});
