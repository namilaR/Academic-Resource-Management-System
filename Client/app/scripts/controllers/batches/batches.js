/**
 * Created by User on 11/18/2016.
 */
angular.module('armsAngularApp')
    .controller('BatchCtrl', ['$scope', 'subjectService', 'centerService', 'facultyService', 'departmentService', 'batchService', function ($scope, subjectService, centerService, facultyService, departmentService, batchService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.centers = [];
        $scope.faculties = [];
        $scope.departments = [];
        $scope.allDepartments = [];
        $scope.batchSubject= {
            selectedSubjects: []
        };

        $scope.loadParticularDepartments = function() {
            var particularDepartments = [];
            $scope.allDepartments.forEach(function(item) {
                if (item.FacultyId == $scope.batchFaculty) {
                    particularDepartments.push(item);
                }
            });
            $scope.departments = particularDepartments;
        }

        $scope.createBatch = function() {
            var batch = {
                batchName : $scope.batchName,
                batchYear : $scope.batchYear,
                batchSemester : $scope.batchSemester,
                batchType : $scope.batchType,
                batchWeek : $scope.batchWeek,
                DepartmentId : $scope.batchDepartment,
                CenterId : $scope.batchCenter,
                FacultyId : $scope.batchFaculty,
                Subject: $scope.batchSubject.selectedSubjects
            };
            return batchService.createBatch(batch).then(function(result) {
                if(result.status == 200) {
                    swal('success', 'successfully created batch', 'success');
                } else {
                    alert("error going on");
                }
            })
        }

        function getSubjects() {
            subjectService.getAllSubjects().then(function (res) {
                $scope.subjects = res.data;
                console.log($scope.subjects);
            });
        }

        function loadFaculties() {
            facultyService.getAllFacultyDetails().then(function(faculties) {
                $scope.faculties = faculties.data;
            });
        }

        function loadCenters() {
            centerService.getCenters().then(function(centers) {
                $scope.centers = centers.data;
            })
        }

        function loadAllDepartments() {
            departmentService.getAllDepartments().then(function(departments) {
                $scope.departments = departments.data;
                $scope.allDepartments = departments.data;
            })
        }


        loadCenters();
        loadFaculties();
        loadAllDepartments();
        getSubjects();
    }]);