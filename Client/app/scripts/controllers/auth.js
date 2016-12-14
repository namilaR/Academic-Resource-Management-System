'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('AuthCtrl',['$http','$scope','$rootScope','$sce','AuthenticationService','$location', function ($http,$scope,$rootScope,$sce,AuthenticationService,$location ) {
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

        $scope.authenticateLogin = function(){
            $scope.login_btn = {'display':'none'};
            $scope.waiting_message = $sce.trustAsHtml('<p style = "color:blue">Please kindly wait until your request is being processed...</p>');

            $scope.submitData = [
                {
                    "username" : $scope.username,
                    "password" : $scope.password
                }
            ];
                $scope.authentication_message = $sce.trustAsHtml('');
                AuthenticationService.login($scope.submitData).then(function(success) {
                    $scope.waiting_message = $sce.trustAsHtml('<p style = "color:blue">Login Successfull</p>');
                    var user_credentials = AuthenticationService.getUserCredentials();
                    var user_role = user_credentials.usertype;
                    if( user_role == 'Admin'){
                        $location.path( "/control-panel" );
                    }
                    else {
                        $location.path( "/" );
                    }
                }, function(errMsg) {
                    $scope.authentication_message = $sce.trustAsHtml('<p style = "color:red" >Login Unsuccessfull. Please try again.</p>');
                    $scope.login_btn = {'display':'block'};
                    $scope.waiting_message = $sce.trustAsHtml('');
        });
                $scope.submitData = '';
                angular.element('.modal').modal('hide');
        };

        $scope.logout = function(){
            console.log("user logout");
            AuthenticationService.logout();
            $location.path("/login");
        };

  }]);
