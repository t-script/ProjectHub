/**
 * Functions.js
 *
 * @description :: Check, if a string starts with a certain word/string/charcter
 */
module.exports = {
  getProjects: function(projects, req, res, cb){
    var rtn = [];
    for (var i = 0; i < projects.length; i++){
      for (var j = 0; j < projects[i].members.length; j++){
        if (projects[i].members[j].id == req.session.user.id || projects[i].leader.id == req.session.user.id){
          rtn.push(projects[i]);
        }
      }
    }

    cb(req, res, rtn);
  }

};
