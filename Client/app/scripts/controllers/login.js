'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('LoginCtrl',function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.element('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
    });      
  });
