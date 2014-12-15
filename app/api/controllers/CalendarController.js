/**
 * ProjectController
 *
 * @description :: Server-side logic for managing the calender
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  createEvent: function(req, res) {

  },

  updateEvent: function(req, res) {

  },

  deleteEvent: function(req, res) {

  },

  createProject: function(req, res){
    sails.log.verbose("[ProjectCtrl] Action 'createProject' called");
    //Check if projectname was entered
    if (!req.body.projectName){
      sails.log.info('No projectname provided');
      return res.json({ error: 'You need to enter a projectname' }, 500);
    }

    Project.create({
      name: req.body.projectName,
      leader: req.session.user.id
    }).exec(function(err, created){
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error creating a new project' }, 500);
      }

      created.members.add(req.session.user.id);
      created.save(function(err){
        if (err){
          sails.log.error(err);
          return res.json({ error: 'There was an error creating a new project' }, 500);
        }

        sails.log.info("[ProjectCtrl] Project '" + req.body.projectName + "' created");
        return sails.controllers.project.getProjectsByUser(req, res);
      });
    });
  },

  getProjectsByUser: function(req, res){
    sails.log.verbose("[ProjectCtrl] Action 'getProjectsByUser' called");

    Project.find({or : [{leader: req.session.user.id}, {members: req.session.user.id}] }).exec(function(err, found){
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error retrieven projects' }, 500);
      }

      return res.json(found, 200);
    });
  },

  getProjectsByID: function(req, res){

  },

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
          project.members.add({id : user.id, firstname : user.firstname, lastname : user.lastname});
          project.save(function (err) { /* all done */ });
          sails.log.info('[ProjectCtrl.addmember] Add member "'+user.lastname +'"');
          return sails.controllers.project.getMembers(req, res);
        });
    });
  },

  getMembers: function (req, res) {
    Project.findOne()
      .where({ id : req.body.projectId }).populate('members')
      .exec(function(err, project){
        if (err){
          sails.log.error(err);
          return res.json({error: 'Server error'}, 500);
        }

        return res.json(project.members, 200);
      });
  },

  getKanbanColumns: function(req, res){
    sails.log.verbose("[ProjectCtrl] Action 'getKanbanColumns' called");

    KanbanColumns.find().where({project: req.param('id')}).exec(function(err, columns){
      if(err){
        sails.log.error(err);
        return res.json({error: 'Server error'}, 500);
      }

      return res.json(columns, 200);
    });
  }
};

