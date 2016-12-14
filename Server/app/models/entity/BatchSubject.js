/**
 * Created by User on 10/12/2016.
 * Develop: Kasun
 * Model: BatchSubject
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var BatchSubject = connection.define('BatchSubject',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type: Sequelize.STRING
    },
    semester: {
        type: Sequelize.STRING
    }

},{
    tableName: 'batchSubject',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = BatchSubject;