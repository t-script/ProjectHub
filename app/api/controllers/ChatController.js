/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  subscribeUsers: function(req, res){
    sails.log.verbose("[ChatCtrl] Action 'subscribeUsers' called");
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
      },
   // });

  sendPrivateMsg: function(req, res){
    sails.log.verbose("[ChatCtrl] Action 'sendPrivateMsg' called");

    // Gewünschten User aus der Datenbank holen
    User.findOneByUsername(req.param('reciever')).exec(function(err, user){

      // Bei Fehler return
      if (err){
        sails.log.error(err);
        return res.json('There was an server error', 500);
      }

      // Wenn kein Fehler aufgetretten ist und ein user gefunden wurde
      if (user){
        // Speichere private Nachricht in DB
        PrivateChatMsg.create({
          message: req.param('msg'),
          sender: req.session.user.id,
          sendername: req.session.username,
          reciever: user.id,
          read: user.online
        }).exec(function(err, createdMsg){
          // Bei Fehler return
          if (err){
            sails.log.error(err);
            return res.json('There was an server error', 500);
          }

          // Wenn der User online ist, direkt via Socket an den User senden
          if (user.online == true)
            sails.sockets.emit(user.socketid, 'privateMsg', createdMsg);
        });
      }
    });
  },

  getPrivateMessages: function(req, res){
    sails.log.verbose("[ChatCtrl] Action 'getPrivateMessages' called");

    // Private Nachricht einer bestimmten Konversation holen
    PrivateChatMsg.find({or: [
        {sender: req.session.user.id, reciever: req.param('sender')},
        {sender: req.param('sender'), reciever: req.session.user.id},
      ], limit: 100, sort: 'createdAt: ASC'})
      .exec(function(err, msgs){
        // Bei Fehler return
        if (err){
          sails.log.error(err);
          return res.json('There was an server error', 500);
        }

        // Gefundene Nachrichten zurückliefern
        return res.json(msgs, 200);
      });
  },

  getGroupMessages: function(req, res){
    sails.log.verbose("[ChatCtrl] Action 'getGroupMessages' called");

    GroupChatMsg.find({ where: { project: req.param('projectId')}, limit: 100, sort: 'createdAt: ASC' })
      .exec(function(err, msg){
        // Bei Fehler return
        if (err){
          sails.log.error(err);
          return res.json('There was an server error', 500);
        }

        // Gefundene Nachrichten zurückliefern
        return res.json(msgs, 200);
      });
  },

  joinProjectRoom: function(req, res){
    sails.log.verbose("[ChatCtrl] Action 'joinProjectRoom' called");

    //TODO Prüfen, ob User teil des Projekts ist

    sails.sockets.join(req.socket, 'project-room-'+req.param('projectId'));

    GroupChatMsg.find({ where: { project: req.param('projectId')}, limit: 100, sort: 'createdAt: ASC' })
      .exec(function(err, msgs){
        // Bei Fehler return
        if (err){
          sails.log.error(err);
          return res.json('There was an server error', 500);
        }

        // Gefundene Nachrichten zurückliefern
        console.log(msgs);
        return res.json(msgs, 200);
      });
  },

  sendGroupMsg: function(req, res){
    sails.log.verbose("[ChatCtrl] Action 'sendGroupMsg' called");

    GroupChatMsg.create({
      message: req.param('msg'),
      sender: req.session.user.id,
      sendername: req.session.user.username,
      project: req.param('projectId')
    }).exec(function(err, createdMsg){
      // Bei Fehler return
      if (err){
        sails.log.error(err);
        return res.json('There was an server error', 500);
      }

      sails.sockets.broadcast('project-room-'+req.param('projectId'), 'groupMsg', createdMsg);
    });
  }
};

