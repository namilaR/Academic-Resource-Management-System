'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:CenterCenterCtrl
 * @description
 * # CenterCenterCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('CenterCenterCtrl', ['$scope', 'subjectService', 'centerService', function ($scope, subjectService, centerService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.updateCenter = {};
    $scope.updateCenter.Subjects = [];
    $scope.selectedSubjects = [];

    $scope.submitCenterForm = function (isvalid) {
      var center = {};
      if ($scope.CenterName) {
        center.centerName = $scope.CenterName;
        center.subject = $scope.selectedSubjects;
        return centerService.createCenter(center).then(function (data) {
          if (data.status == 200) {
            $scope.CenterName = '';
            $scope.selectedSubjects = [];
            swal('success', 'successfully insert center', 'success');
            getCenters();
          } else {
            alert("error going on");
          }
        });
      } else {
        swal('error', 'please fill empty fields', 'Error');
      }
    }

    $scope.markSelected = function (index) {
      if ($scope.subjects[index].isSelected) {
        console.log("method called");
        $scope.selectedSubjects.push($scope.subjects[index].id);
      } else {
        console.log("deselect called");
        $scope.selectedSubjects.splice(index, 1);
      }
    }

    $scope.deleteCenter = function (centerId) {
      if (centerId) {
        return centerService.deleteCenter(centerId).then(function (response) {
          if (response) {
            swal('success', 'successfully remove center', 'success');
            return getCenters();
          } else {
            return alert("error going on");
          }
        })
      }
    }

    $scope.updateCenterDetails = function (center) {
      $scope.updateCenter = center;
      $scope.selectedSubjects.length = 0;
    }

    $scope.checkAvailable = function (subjectId) {
      var count = $scope.updateCenter.Subjects.length;
      for (var i = 0; i < count; i++) {
        if ($scope.updateCenter.Subjects[i].id == subjectId) {
              $scope.selectedSubjects.push(subjectId);
              return true;
        }
      }
    }

    function getCenters() {
      centerService.getCenters().then(function (response) {
        $scope.centers = response.data;
        return;
      })
    }

    function getSubjects() {
      subjectService.getAllSubjects().then(function (res) {
        $scope.subjects = res.data;
      });
    }

    $scope.updateCenterInfoToServer = function() {
      var selectedSubjects = $scope.selectedSubjects;
      console.log(selectedSubjects);
    }

    getSubjects();
    getCenters();
  }]);
