/**
 * Created by User on 9/18/2016.
 * Develop: Kasun
 * Model: User Role
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var userRole = connection.define('userRole', {
    userRoleName: Sequelize.STRING,
    status: Sequelize.BOOLEAN
},{
    tableName: 'user_role',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});


module.exports = userRole;