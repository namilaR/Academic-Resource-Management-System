'use strict';

/**
 * @ngdoc service
 * @name armsAngularApp.apiDataService
 * @description
 * # apiDataService
 * This service handle all api get and post calls.
 */
angular.module('armsAngularApp')
  .factory('dataServiceRole',[ '$http','CONFIG',function ($http,CONFIG) {
    //get base url
    var baseUrl  = CONFIG.BASE_URL;
    var dataServiceRole = {};

    //insert new role api call
    dataServiceRole.insertNewRole = function(userRole) {
      return $http.post(baseUrl+'add-new-role',userRole);
    };

    dataServiceRole.getAllUsers = function(){
        return $http.get('http://57d2c6c7daccc81100513fe7.mockapi.io/api/user-roles');
    };

    return dataServiceRole;

  }]);
