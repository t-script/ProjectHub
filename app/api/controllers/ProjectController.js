/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	addMember: function (req, res) {

    User.findOneByUsername(req.body.member).exec(function(err, user) {
      // Return if an error occoured
      if (err) {
        sails.log.error(err);
        return res.json({error: 'Server error'}, 500);
      }

      // Return if no user was found
      if (!user) {
        sails.log.info('[ProjectCtrl.addmember] Username "'+req.body.member+'" not found.');
        return res.json({ error: 'User not found' }, 404);
      }

      // Everything fine --> Update Project
      Project.findOne()
        .where({ id: req.body.projectId })
        .then(function(project){
          project.members.push({id : user.id, firstname : user.firstname, lastname : user.lastname});
          project.save(function (err) { /* all done */ });
          return res.json('Add member!', 200);
        });
    });
  },

  getMembers: function (req, res) {
    Project.findOne()
      .where({ id : req.body.projectId })
      .then(function(project){
        return res.json(project.members, 200);
      });
  }
};

