/**
 * Created by User on 9/18/2016.
 * Develop: Kasun
 * Model: Student
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Student = connection.define('Student',{
    status: Sequelize.BOOLEAN
},{
    tableName: 'student',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Student;