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
        'CONFIG',
        function($scope,$rootScope,appointmentDataService,CONFIG) {
          console.log('DetailModalCtrl');
          $scope.comment;
          $scope.reasonForCancel;
          $scope.appointmentData;

          $scope._24hoursToAmPm = function (time) {
            return moment(time, 'HH:mm:ss').format("hh:mm A");
          };
          $scope._JsDateToDate = function (date) {
            return moment(date).format(" MMMM Do YYYY");
          };

          $scope.placeComment = function () {
            $scope.appointmentData.appointmentComment = this.comment;
            appointmentDataService.sendComment($scope.appointmentData).then();
            this.comment = '';
          };

          $rootScope.$on('moreDetails', function (event, data) {
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

          //load time table in new tab
          $scope.showTimeTable = function(operation){
            console.log($scope.appointmentData);
            // if (operation == 'make') {
            //   window.open(CONFIG.BASE_URL+'pdfs/'+$scope.appointmentData.Student.Batch.timeTable,CONFIG.BASE_URL+'pdfs/'+'_blank');
            // } else {
            //   window.open(CONFIG.BASE_URL+'pdfs/'+$scope.appointmentData.Student.Batch.timeTable,'_blank');
            // }

          };
        }


    ]);
