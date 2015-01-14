/**
 * PokerController
 *
 * @description :: Server-side logic for managing planning poker
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  startVoting: function(req, res){
    sails.log.verbose("[PokerCtrl] Action 'startVoting' called");

    if (!req.param('project') || !req.param('ticket')){
      sails.log.info('[PokerCtrl.startVoting] No project or ticket provided');
      return res.json({ error: 'Project or ticket missing.' }, 500);
    }

    // Check if projectleader! New policie?
    // if (!req.session.user)

    PokerVoting.create({
      open: true,
      votes: {},
      ticket: req.body.ticket,
      project: req.body.project
    }).exec(function(err, created){
      if (err){
        sails.log.error(err);
        return res.json({error: 'There was an error starting a new vote'}, 500);
      }
      sails.log.info("[PokerCtrl.startVoting] A new voting started!");

      Tickets.findOne({project: req.body.project, id: req.body.ticket}).exec(function(err, found){
        if (err){
          sails.log.error(err);
          return res.json({error: 'There was an error starting a new vote'}, 500);
        }

        sails.sockets.broadcast('project-room-'+req.param('project'), 'votingStarted',
          { voting: created, ticket: found }) ;
        return res.json({success: 'Voting started.'}, 200);
      });
    })
  },

  stopVoting: function(req, res){
    sails.log.verbose("[PokerCtrl] Action 'stopVoting' called");

    if (!req.param('project') || !req.param('ticket')){
      sails.log.info('[PokerCtrl.stopVoting] No project or ticket provided');
      return res.json({ error: 'Project or ticket missing.' }, 500);
    }

    // Check if projectleader! New policie?

    PokerVoting.update(
      {ticket: req.param('ticket'), project: req.param('project')},
      {open: false}
    ).exec(function(err, updated){
        if (err){
          sails.log.error(err);
          return res.json({error: 'There was an error stoping a vote'}, 500);
        }
        sails.log.info("[PokerCtrl.stopVoting] Voting end");

        sails.sockets.broadcast('project-room-'+req.param('project'), 'votingStoped',
          { voting: updated }) ;

        return res.json({success: 'Voting end.'}, 200);
      });
  },

  vote: function(req, res){
    sails.log.verbose("[PokerCtrl] Action 'vote' called");

    if (!req.param('project') || !req.param('ticket') || !req.param('vote')){
      sails.log.info('[PokerCtrl.vote] No project, ticket or vote provided');
      return res.json({ error: 'Project, ticket or vote missing.' }, 500);
    }

    // Check if part of project! New policie?

    PokerVoting.findOne(
      {project: req.param('project'), ticket: req.param('ticket'), open: true}
    ).exec(function(err, found){
        if (err){
          sails.log.error(err);
          return res.json({ error: 'Voting not possible' }, 500);
        }

        sails.log.info('[PokerCtrl.vote] Voting found and open');
        sails.log.debug(found.votes);

        found.votes[req.session.user.id] = {
          'firstname' : req.session.user.firstname,
          'lastname' : req.session.user.lastname,
          'value' : req.param('vote')  };

        found.save(function(err){
          if (err){
            sails.log.error(err);
            return res.json({ error: 'Voting not possible' }, 500);
          }else{
            sails.log.info('[PokerCtrl.vote] Voting successfull');

            sails.sockets.broadcast('project-room-'+req.param('project'), 'voted',
               found.votes ) ;

            return res.json({success: 'Vote successfull.'}, 200);
          }
        });
     });
  },

  saveValue: function(req, res){
    sails.log.verbose("[PokerCtrl] Action 'saveValue' called");

    if (!req.param('project') || !req.param('ticket') || !req.param('vote')){
      sails.log.info('[PokerCtrl.vote] No project, ticket or vote provided');
      return res.json({ error: 'Project, ticket or vote missing.' }, 500);
    }

    Tickets.update(
      { project: req.param('project'), ticket: req.param('ticket') },
      { approximatedTime: req.param('vote') }
    ).exec(function(err, updated){
        if (err){
          sails.log.error('[PokerCtrl.vote] Saving approximated time for ticket not possible');
          return res.json({ error: 'Saving approximated time for ticket not possible' }, 500);
        }

        return res.json({success: 'Saving approximated time for ticket successfull.'}, 200);
      });
  }

};

