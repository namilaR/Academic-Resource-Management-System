'use strict';

describe('Directive: UserType', function () {

  // load the directive's module
  beforeEach(module('armsAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-user-type></-user-type>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the UserType directive');
  }));
});
