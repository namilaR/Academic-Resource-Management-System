/**
 * Created by User on 9/18/2016.
 * Develop: Kasun
 * Model: Hod
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Hod = connection.define('Hod',{
    status: Sequelize.BOOLEAN
},{
    tableName: 'hod',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Hod;