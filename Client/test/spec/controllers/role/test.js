'use strict';

describe('Controller: RoleTestCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var RoleTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoleTestCtrl = $controller('RoleTestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RoleTestCtrl.awesomeThings.length).toBe(3);
  });
});
