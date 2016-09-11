'use strict';

describe('Service: apiDataService', function () {

  // load the service's module
  beforeEach(module('armsAngularApp'));

  // instantiate service
  var apiDataService;
  beforeEach(inject(function (_apiDataService_) {
    apiDataService = _apiDataService_;
  }));

  it('should do something', function () {
    expect(!!apiDataService).toBe(true);
  });

});
