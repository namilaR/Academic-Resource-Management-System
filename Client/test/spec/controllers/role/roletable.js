'use strict';

describe('Controller: RoleRoletableCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var RoleRoletableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoleRoletableCtrl = $controller('RoleRoletableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RoleRoletableCtrl.awesomeThings.length).toBe(3);
  });
});
