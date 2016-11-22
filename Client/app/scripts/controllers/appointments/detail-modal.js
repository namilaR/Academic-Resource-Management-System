'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:DetailModalCtrl
 * @description
 * # DetailModalCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('DetailModalCtrl', [
        '$scope',
        '$rootScope',
        'appointmentDataService',
        function($scope,$rootScope,appointmentDataService) {
        	console.log('DetailModalCtrl');
        	$scope.comment;
          $scope.reasonForCancel;
          $scope.appointmentData;

        	$scope._24hoursToAmPm = function(time) {
        	    return moment(time, 'HH:mm:ss').format("hh:mm A");
        	};
        	$scope._JsDateToDate = function(date) {
        	    return moment(date).format(" MMMM Do YYYY");
        	};

        	$scope.placeComment = function(){
        		$scope.appointmentData.appointmentComment = this.comment;
        		appointmentDataService.sendComment($scope.appointmentData).then();
        	};

          $rootScope.$on('moreDetails',function (event,data) {
            $scope.appointmentData = data;

          });

          $scope.submitAppoinmentCancel = function () {
            $scope.appointmentData.appointmentCancleNote = $scope.reasonForCancel;
            appointmentDataService.sendCancelRequest($scope.appointmentData).then(function (response) {
              angular.element("#cancelModal").modal('hide');
              appointmentDataService.refreshTables();
              $scope.appointmentData.cancel = true; 
              swal({
                title: "Request Sent",
                text: "You reschedule request has been successfully send",
                type: "success",
                timer: 2000
              });
            }, function (error) {
              /* body... */
            });
          };
        }

    ]);
