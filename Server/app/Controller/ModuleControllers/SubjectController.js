/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */
var Modules = require('../../models/Models');
var Subject = Modules.Subject;


SubjectController = function() {
  this.get = function(res) {
    Subject.findAll().then(function(data) {
      res.send(data);
    });
  };
};

module.exports = new SubjectController();
