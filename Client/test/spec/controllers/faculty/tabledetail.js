'use strict';

describe('Controller: FacultyTabledetailCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var FacultyTabledetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FacultyTabledetailCtrl = $controller('FacultyTabledetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FacultyTabledetailCtrl.awesomeThings.length).toBe(3);
  });
});
