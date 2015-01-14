/**
 * TicketsController
 *
 * @description :: Server-side logic for managing tickets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  createTickets: function(req, res) {
    sails.log.verbose("[TicketsCtrl] Action 'createTickets' called");
    if (!req.body.ticketid && !req.body.title && !req.body.description && !req.body.project) {
      sails.log.info('No id, title, description or project provided');
      return res.json({error: 'Invalid entry'}, 500);
    }

    KanbanColumns.findOne(
      {project: req.body.project, name: 'Backlog'}
    ).exec(function (err, backlog) {
        if (err) {
          sails.log.error(err);
          return res.json('Server error', 500);
        }
        Tickets.create({
          ticketid: req.body.ticketid,
          title: req.body.title,
          description: req.body.description,
          project: req.body.project,
          user: req.session.user.id,
          columns: backlog.id
        }).exec(function (err) {
          if (err) {
            sails.log.error(err);
            return res.json({error: 'There was an error creating a new ticket'}, 500);
          }
          sails.log.info("[TicketsCtrl] Ticket '" + req.body.title + "' created");
          return sails.controllers.tickets.getTickets(req, res);
        });
      })
  },

  getTickets: function(req, res, broadcast) {
    sails.log.verbose("[TicketsCtrl] Action 'getTickets' called");
    broadcast = typeof broadcast !== 'undefined' ? broadcast : false;

    Tickets.find({ project : req.body.project }).populate('columns').exec(function(err, found){
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error retrieven tickets' }, 500);
      }

      if (broadcast == true){
        sails.sockets.broadcast('project-room-'+req.param('project'), 'updateTickets', found);
      }else {
        return res.json(found, 200);
      }
    });
  },

  getTicketsbyUser: function(req, res, broadcast) {
    sails.log.verbose("[TicketsCtrl] Action 'getTickets' called");
    broadcast = typeof broadcast !== 'undefined' ? broadcast : false;
    Tickets.find({ user: req.session.user.id }).populate('columns').exec(function(err, found){
      if (err){
        sails.log.error(err);
        return res.json({ error: 'There was an error retrieven tickets' }, 500);
      }

      if (broadcast == true){
        sails.sockets.broadcast('project-room-'+req.param('project'), 'updateTickets', found);
      }else {
        return res.json(found, 200);
      }
    });
  }

};

