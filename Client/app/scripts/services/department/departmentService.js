/**
 * Created by User on 11/16/2016.
 */
angular.module('armsAngularApp')
    .factory('departmentService', ['$http', 'CONFIG', function ($http, CONFIG) {
        var baseUrl = CONFIG.BASE_URL;
        var departmentService = {};

        /*
         * service that make call service to insert new department
         * @department :- new department instance
         */
        departmentService.createDepartment = function(department) {
            return $http({
                method: 'post',
                url: baseUrl + 'department',
                data: department
            }).then(function (response) {
                return response;
            });
        }

        /*
         * get all the departments
         */
        departmentService.getAllDepartments = function() {
            return $http({
                method: 'get',
                url: baseUrl + 'department'
            }).then(function (response) {
                return response;
            });
        }

        /*
         * service calling that delete the department
         * @departmentId :- id of the department
         */
        departmentService.deleteDepartment = function(departmentId) {
            return $http({
                method: 'delete',
                url: baseUrl + 'department/' + departmentId
            }).then(function(response) {
                return response;
            });
        }

        /*
         * service calling to update excisting department
         * @department :- the department object with updated details
         */
        departmentService.updateDepartmentDetails = function(department) {
            return $http({
                method: 'put',
                url: baseUrl + 'department',
                data: department
            }).then(function(response) {
                return response;
            });
        }
        return departmentService;
    }]);