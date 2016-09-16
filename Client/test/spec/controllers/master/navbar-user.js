'use strict';

describe('Controller: NavbarCtrlUser', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var NavbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrlUser', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NavbarCtrl.awesomeThings.length).toBe(3);
  });
});
