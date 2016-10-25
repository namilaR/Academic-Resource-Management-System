'use strict';

describe('Controller: FeedbackFeedbackCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var FeedbackFeedbackCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedbackFeedbackCtrl = $controller('FeedbackFeedbackCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FeedbackFeedbackCtrl.awesomeThings.length).toBe(3);
  });
});
