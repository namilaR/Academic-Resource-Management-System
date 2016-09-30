'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:UserTypeCtrl
 * @description
 * # UserTypeCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
.controller('UserTypeTableCtrl',['$scope','$http','$rootScope','DTOptionsBuilder','DTColumnBuilder','$q',function ($scope,$http,$rootScope,DTOptionsBuilder, DTColumnBuilder,$q) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
        var getAllUserRoles_api = 'http://localhost:8002/user-role/get-all-user-roles';
        //Set up table headers
        $scope.setTableHeaders = function(){
            $scope.authorized = true;
            $scope.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('ID'),
                DTColumnBuilder.newColumn('userRoleName').withTitle('Role'),
                DTColumnBuilder.newColumn('status').withTitle('Status'),
                DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable()
                    .renderWith(function(data, type, full, meta) {
                        return '<button class="btn btn-warning" ng-click="edit(' + data.id + ')">' +
                            '   <i class="fa fa-edit"></i>' +
                            '</button>&nbsp;';
                    }),
                DTColumnBuilder.newColumn(null).withTitle('Delete').notSortable()
                    .renderWith(function(data, type, full, meta) {
                        return '<button class="btn btn-danger" ng-click="delete(' + data.id + ')">' +
                            '   <i class="fa fa-trash-o"></i>' +
                            '</button>';
                    })
            ];
            $scope.dtInstance = {};
        };

        //Load table for URL
        $scope.loadUserTypeTable = function(){
            $scope.dtOptions = DTOptionsBuilder
                .fromFnPromise(function() {
                    return $http.get(getAllUserRoles_api).then(function(response){
                        return (response.data);
                    });
                })
                .withPaginationType('full_numbers')
                .withBootstrap();
        };

        $scope.setTableHeaders();
        $scope.loadUserTypeTable();

        $scope.reloadData = function() {
            $scope.dtInstance.changeData( $http.get(getAllUserRoles_api).then(function(response){
                return (response.data);
            }));
        };

        $rootScope.$on("reloadUserTypeTable", function(){
            $scope.reloadData();
        });

}])
.controller('UserTypeCtrl',['$http','$scope','$rootScope', function ($http,$scope,$rootScope ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.submitUserRoleForm = function(isValid){
        if (isValid) {
          $scope.data = {"userRoleName" : $scope.userType};
          $http.post('http://localhost:8002/user-role/add-new-user-role',$scope.data).then(
              (function(){
                      $scope.reloadUserTypeTable();
                  }
              )
          );
          $scope.userType = '';
          $scope.userTypeForm.$setPristine();
          angular.element('.modal').modal('hide');
        }
      };

      $scope.reloadUserTypeTable = function() {
            $rootScope.$emit("reloadUserTypeTable", {});
      }
}]);
