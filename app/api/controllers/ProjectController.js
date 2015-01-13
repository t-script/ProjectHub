/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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

    Project.find().populate('members').populate('leader').exec(function(err, found){
      //{or : [{leader: req.session.user.id}, {members: req.session.user.id}] }
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error retrieven projects' }, 500);
      }

      /* Sails/Waiterline unterstützt keine where-statements in Many-to-Many Relations, daher
       * muss durch alle Projekte iteriert werden, um nur die Projekte zurückzuliefern, in denen ein User als Member
       * vorhanden ist.
       */
      Functions.getProjects(found, req, res, function(req, res, rtn){
        return res.json(rtn, 200);
      });

    });

  },

	addMember: function (req, res) {
    sails.log.verbose("[ProjectCtrl] Action 'addMember' called");

    if (!req.param('projectId') || !req.param('member')){
      sails.log.info('[ProjectCtrl.removeMember] No ProjectID or username');
      return res.json('No ProjectID or username', 500);
    }

    User.findOneByUsername(req.param('member')).exec(function(err, user) {
      // Return if an error occoured
      if (err) {
        sails.log.error(err);
        return res.json({error: 'Server error'}, 500);
      }

      // Return if no user was found
      if (!user) {
        sails.log.info('[ProjectCtrl.addmember] Username "'+req.param('member')+'" not found.');
        return res.json({ error: 'User not found' }, 404);
      }

      // Everything fine --> Update Project
      Project.findOne()
        .where({ id: req.param('projectId') })
        .then(function(project){
          project.members.add(user.id);
          project.save(function (err) {
            if (err){
              sails.log.error(err);
              return res.json('User already exists in project', 500);
            }
            sails.log.info('[ProjectCtrl.addmember] Member "'+user.lastname +'" added');
            return sails.controllers.project.getMembers(req, res, true);
          });
        });
    });
  },

  getMembers: function (req, res, broadcast) {
    broadcast = typeof broadcast !== 'undefined' ? broadcast : false;

    Project.findOne()
      .where({ id : req.param('projectId') }).populate('members').populate('leader')
      .exec(function(err, project){
        if (err){
          sails.log.error(err);
          return res.json({error: 'Server error'}, 500);
        }

        if (broadcast == true) {
          sails.sockets.broadcast('project-room-' + req.param('projectId'), 'addUser', {
            leader: project.leader,
            member: project.members
          });
        }else{
          return res.json({leader: project.leader, members: project.members}, 200);
        }
      });
  },

  removeMember: function (req, res){
    sails.log.verbose("[ProjectCtrl] Action 'removeMember' called");

    if (!req.param('projectId') || !req.param('memberid')){
      sails.log.info('[ProjectCtrl.removeMember] No ProjectID or MemberID');
      return res.json('No ProjectID or MemberID', 500);
    }

    Project.findOne()
      .where({ id: req.param('projectId') }).populate('leader').populate('members')
      .then(function(project){
        console.log(project.leader.id);
        console.log(req.param('memberid'));
        if (project.leader.id != req.param('memberid')) {
          project.members.remove(req.param('memberid'));
          project.save(function (err) {
            if (err) {
              sails.log.error(err);
              return res.json('Server error', 500);
            }

            sails.log.info('[ProjectCtrl.addmember] Remove member from project.');
            return sails.controllers.project.getMembers(req, res, true);
          });
        }
      });
  }
};

