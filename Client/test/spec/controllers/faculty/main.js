'use strict';

describe('Controller: FacultyMainCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var FacultyMainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FacultyMainCtrl = $controller('FacultyMainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FacultyMainCtrl.awesomeThings.length).toBe(3);
  });
});
