'use strict';

describe('Directive: appointments/cancelModal', function () {

  // load the directive's module
  beforeEach(module('armsAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<appointments/cancel-modal></appointments/cancel-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the appointments/cancelModal directive');
  }));
});
