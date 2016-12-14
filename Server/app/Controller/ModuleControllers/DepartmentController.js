/**
 * Created by User on 11/18/2016.
 */
var Modules = require('../../models/Models');
var Connection = Modules.Connection;
var Department = Modules.Department;
var Faculty = Modules.Faculty;

function DepartmentController() {
    /*
     * create a new faculty
     * @department :- department object that goint to create
     * @res :- response object
     */
    this.createDepartment = function(department, res) {
        return Department.create({
            DepartmentName: department.DepartmentName,
            FacultyId: department.FacultyId
        }).then(function(data) {
            return res.send(data);
        })
    }

    /*
     * get all the departments
     * @res :- the response object use to send data to client
     */
    this.getDepartments = function(res) {
        return Department.findAll({
            include: [{
                model: Faculty
            }]
        }).then(function(departments) {
            return res.send(departments);
        });
    }

    /*
     * delete the department given by the user
     * @departmentId :- id of the department thaat going to delete
     * @res :- the response object use to send data to client
     */
    this.deleteDepartment = function(departmentId, res) {
        return Department.find({
            where: {
                id: departmentId
            }
        }).then(function(department) {
            if(department) {
                return department.destroy().then(function(data) {
                    return res.send(data);
                });
            }
        })
    }

    this.updateDepartment = function(updateDepartment, res) {
        return Department.find({
            where: {
                id: updateDepartment.id
            }
        }).then(function(department) {
            if(department) {
                return department.update({
                    DepartmentName: updateDepartment.DepartmentName,
                    FacultyId: updateDepartment.FacultyId
                }).then(function(data) {
                    return res.send(data);
                })
            }
        })
    }
}

module.exports = new DepartmentController();