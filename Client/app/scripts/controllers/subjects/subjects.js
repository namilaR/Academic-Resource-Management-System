'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('SubjectsCtrl', ['$scope', '$rootScope', 'subjectService', '$uibModal', function ($scope, $rootScope, subjectService, $uibModal) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*
     * submit new subject
     * isvalid = parameter that comes from view that confirm data are valid or not
     */
    $scope.submitSubjectForm = function (isvalid) {
      if (isvalid) {
        var subject = {};
        subject.subjectName = $scope.subjectName;
        subject.subjectCode = $scope.subjectCode;
        subject.subjectCredit = $scope.subjectCredit;
        createSubject(subject);
      }
    }

    /*
     * function that handles the service side of create a subject
     */
    function createSubject(subjectInstance) {
     	subjectService.insertNewSubject(subjectInstance).then(function (res) {
        if (res.status === 200) {
          swal('success', "insert new subject", 'success');
          getAllSubjects();
          $scope.subjectName = '';
          $scope.subjectCode = '';
          $scope.subjectCredit = '';
        } else {
          swal('Error', 'Not inserted record', 'error');
        }
     	});
    }

    /*
     * get all the subjects
     */
    function getAllSubjects() {
      subjectService.getAllSubjects().then(function (res) {
        if (res.data) {
          $scope.allSubject = res.data;
        }
      })
    }

    $rootScope.$on("allSubjects", function () {
      getAllSubjects();
    })


    /*
     * delete the subject
     */
    $scope.deleteSubject = function (subjectId, subjectName) {
      swal({
        title: "Are You sure to delete this subject, " + subjectName,
        text: "After you delete this you have to add it again if you want",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function () {
        subjectService.deleteSubject(subjectId).then(function (response) {
          if (response.status === 200) {
            swal('success', "Delete subject", 'success');
            getAllSubjects();
          } else {
            swal('Error', 'Not deleted record', 'error');
          }
        });
      });
    };

    /*
     * update subject
     */
    $scope.updateSubject = function (subjectId, subjectName, subjectCode, subjectCredit) {
      var updateItems = {};
      updateItems.subjectId = subjectId;
      updateItems.subjectName = subjectName;
      updateItems.subjectCode = subjectCode;
      updateItems.subjectCredit = subjectCredit;
      this.open(updateItems);
    }
    getAllSubjects();

    $scope.open = function (updateItems) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaDescribedBy: 'modal-body',
        templateUrl: '../../views/subjects/updateSubject.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl',
        resolve: {
          items: function () {
            return updateItems;
          }
        }
      });
    }
  }]);

angular.module('armsAngularApp').controller('ModalInstanceCtrl', ['$scope', '$rootScope', 'subjectService', 'items', '$uibModalInstance', function ($scope, $rootScope, subjectService, items, $uibModalInstance) {
  $scope.updateSubjectName = items.subjectName;
  $scope.updateSubjectCode = items.subjectCode;
  $scope.updateSubjectCredit = items.subjectCredit;

  $scope.updateSubjectForm = function (subjectName, subjectCode, subjectCredit) {
    var subject = {};
    subject.subjectId = items.subjectId;
    subject.subjectName = subjectName;
    subject.subjectCode = subjectCode;
    subject.subjectCredit = subjectCredit;
    subjectService.updateSubject(subject).then(function (result) {
      if (result.status === 200) {
        swal('success', 'updated subject successfully', 'success');
        getAllSubjects();
      } else {
        swal('Error', 'Not updated correctly', 'Error');
      }
    });
  }

  /*
   * get all the subjects
   */
  function getAllSubjects() {
    $rootScope.$emit("allSubjects");
  }
}]);