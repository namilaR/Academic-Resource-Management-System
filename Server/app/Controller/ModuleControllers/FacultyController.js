/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * developer:- Amila
 */
var Modules = require('../../models/Models');
var Faculty = Modules.Faculty;

FacultyController = function() {
    
    /*
     * create new faculty
     */
    this.create = function(FacultyInstance, res) {
        Faculty.create(FacultyInstance).then(function(data) {
            res.send(data);
        });
    };
    
    /*
     * get all facluty details
     */
    this.getAllFaculty = function(res) {
        Faculty.findAll().then(function(data) {
            res.send(data);
        });
    };
    
    /*
     * delete the faculty details
     */
    this.deleteFaculty = function(facultyId, res) {
        Faculty.find({
            where: {
                id: facultyId
            }
        }).then(function(data) {
            if(data) {
                data.destroy().then(function(result) {
                    return res.send(result);
                });
            }
            return;
        });
    };
};

module.exports = new FacultyController();