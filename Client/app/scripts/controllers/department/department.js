/**
 * Created by User on 11/15/2016.
 */
angular.module('armsAngularApp').
    controller('DepartmentCtrl',['$scope', 'facultyService', 'departmentService', function($scope, facultyService, departmentService) {
        $scope.faculties = [];
        $scope.departments = [];
        $scope.updateDepartment = null;

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        /*
         * method that use to create new departments
         */
        $scope.createDepartment = function() {
            if(!$scope.departmentName || !$scope.faculty) {
                alert("Please fill empty fields");
            } else {
                var department = {
                    DepartmentName : $scope.departmentName,
                    FacultyId : $scope.faculty
                }
                return departmentService.createDepartment(department).then(function(result) {
                    if(result.status == 200) {
                        swal('success', 'successfully created department', 'success');
                        getAvailableDepartments();
                        $scope.departmentName = "";
                    }
                });
            }
        }

        /*
         * method to delete the department
         * @department :- delete object of the department that you going to delete
         */
        $scope.deleteDepartment = function(department) {
            swal({
                title: "Are you sure to delete "+department.DepartmentName+" department?",
                text: "You going to delete department permenently!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function(){
                return departmentService.deleteDepartment(department.id).then(function(result) {
                    if(result.status == 200) {
                        swal("Deleted!", "department has deleted", "success");
                        getAvailableDepartments();
                    }
                })
            });
        }

        /*
         * method to update department
         * @department :- the department that going to update
         */
        $scope.updateDepartmentDetails = function(department) {
            $scope.updateDepartment = department;
            $scope.updateDepartmentName = department.DepartmentName;
            $scope.updateFaculty = department.Faculty.id;
        }

        /*
         * method after click the update button in modal window
         */
        $scope.modalUpdate = function() {
            var updatedDepartment = {
                id: $scope.updateDepartment.id,
                DepartmentName: $scope.updateDepartmentName,
                FacultyId: $scope.updateFaculty
            }

            if(!updatedDepartment.DepartmentName || !updatedDepartment.FacultyId) {
                alert("please fill out empty fields");
            } else {
                return departmentService.updateDepartmentDetails(updatedDepartment).then(function(result) {
                    if(result.status == 200) {
                        swal("Updated!", "department has Updated", "success");
                        getAvailableDepartments();
                    }
                })
            }
        }
        /*
         * get the available faculty names
         */
        function getFacultyName() {
            facultyService.getAllFacultyDetails().then(function(faculty) {
                faculty.data.forEach(function(item) {
                    $scope.faculties.push(item);
                });
            });
        }

        /*
         * get the all available departments
         */
        function getAvailableDepartments() {
            departmentService.getAllDepartments().then(function(departments) {
                $scope.departments = departments.data;
            })
        }

        getAvailableDepartments();
        getFacultyName();
    }])