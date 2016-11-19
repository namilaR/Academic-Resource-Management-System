/**
 * Created by User on 9/9/2016.
 * Developer :- Kasun
 */
var Module = require('../../models/Models');
var UserRole = Module.UserRole;

function UserRoleController() {
    
    /*
     * get all the user types without filtering
     * @params
     * res = response of middleware express
     */
    this.get = function(res) {
        UserRole.findAll({
                            where: {
                                status: 1
                              }
            }).then(function(data) {
            res.send(data);
        });
    };

    /*
     *insert new user type
     * @params
     * UserRoleInstance = Instance provided by the client
     * res = response of middleware express
     */
    this.create = function(UserRoleInstance, res) {
        UserRole.create( {
                            userRoleName: UserRoleInstance.userRoleName,
                            status: 1
                        }
            ).then(function(data) {
            res.send(data);
        });
    };

    /*
     * update the excisting intances
     * @params
     * res = response of middleware express
     * UserRoleInstance = Instance provided by the client
     */
    this.update = function(UserRoleInstance, res) {
        UserRole.update({
            userRoleName: UserRoleInstance.userRoleName
        },{
            where: {
                userRoleName: UserRoleInstance.userRoleName
            }
        }).then(function(data) {
           res.send(data);
        });
    };

    /*
     * delete the excisting intance
     * @params
     * res = response of middleware express
     * UserRoleInstance = Instance provided by the client
     */
    this.delete = function(UserRoleInstance, res) {
        UserRole.destroy({
            where: {
                userRoleName: UserRoleInstance.userRoleName
            }
        }).then(function(err,data) {
            if(err) {
                res.send(err)
            } else {
                res.send({status: 200, message:"Successfully deleted"});
            }
        });
    }
}

module.exports = new UserRoleController();