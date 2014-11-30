/**
 * ChatController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  subscribeUsers: function(req, res){
    sails.log.info("[ChatCtrl] Action 'subscribeUsers' called");
   /* Project.find({or : [{leader: req.session.user.id}, {members: req.session.user.id}] }).exec(function(err, projects){
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error retrieven projects' }, 500);
      }

      if (projects) {*/ //[/*{projects: found},*/
        sails.log.info("[ChatCtrl] Search for users");
        User.find({where: {or: [{online: false} , {online: true}]}}, {fields: ['id', 'username', 'firstname', 'lastname', 'online']} ).exec(function (err, users) {
          if (err) {
            sails.log.error(err);
            return res.json({error: 'There was an error retrieving projects'}, 500);
          }

          sails.log.info("[ChatCtrl] " + users.length + " user found!");
          User.subscribe(req.socket,users);

          var rtn = {};
          for (var i = 0; i < users.length; i++){
            var data = {
              'username': users[i].username,
              'id': users[i].id,
              'firstname': users[i].firstname,
              'lastname': users[i].lastname,
              'online': users[i].online
            };

            rtn[users[i].username] = data;
          }

          return res.json(rtn, 200);
        });
      }
   // });

};

