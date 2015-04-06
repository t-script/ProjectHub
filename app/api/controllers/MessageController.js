/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  createMessage: function(req, res){
    sails.log.verbose("[MessageCtrl] Action 'createProject' called");
    //Check if projectname was entered
    if (!req.body.text){
      sails.log.info('No message provided');
      return res.json({ error: 'You need to enter a message' }, 500);
    }

    Message.create({
      text: req.body.text,
      leader: req.session.user.id
    }).exec(function(err, created){
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error creating a new message' }, 500);
      }

      sails.log.info("[MessageCtrl] Message '" + req.body.text + "' created");
      return res.json({msg: 'Message created'}, 200);
    });
  }
};

