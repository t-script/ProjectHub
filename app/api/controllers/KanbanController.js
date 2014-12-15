/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  getKanbanColumns: function(req, res){
    sails.log.verbose("[KanbanCtrl] Action 'getKanbanColumns' called");

    KanbanColumns.find().where({project: req.param('id')}).exec(function(err, columns){
      if(err){
        sails.log.error(err);
        return res.json({error: 'Server error'}, 500);
      }

      return res.json(columns, 200);
    });
  },

  updateTicket: function(req, res) {
    sails.log.verbose("[KanbanCtrl] Action 'updateTicket' called");

    if (!req.param('oldColumn') && !req.param('newColumn') && !req.param('oldPos') && !req.param('newPos') && !req.param('project') && !req.param('ticketid')) {
      sails.log.info('[KanbanCtrl] Invalid entry');
      return res.json({error: 'Invalid entry'}, 500);
    }

    // Nach oben in selber Spalte
    if (req.param('oldColumn') == req.param('newColumn') && req.param('oldPos') > req.param('newPos')) {
      Tickets.find(
        {where: {project: req.param('project'), columns: req.param('oldColumn'), position: {'>': req.param('oldPos')}}}
      ).exec(function (err, tickets) {
          if (err) {
            sails.log.error(err);
            return res.json('Server error', 500);
          }

          for (var i = 0; i < tickets.length; i++) {
            tickets[i].position = tickets[i].position + 1;
            tickets[i].save(function (err, saved) {
              if (err) {
                sails.log.error(err);
                return res.json('Server error', 500);
              }
            });
          }

          Tickets.update({id: req.param('ticketid')}, {position: req.param('newPos')}).exec(function (err, updated) {
            if (err) {
              sails.log.error(err);
              return res.json('Server error', 500);
            }

            Tickets.find({
              project: req.param('project')
            }).populate('columns').exec(function (err, foundOld) {
              var rtn = {};
              for (var i = 0; i < foundOld.length; i++) {
                rtn[foundOld[i].columns.id] = [];
              }

              for (var i = 0; i < foundOld.length; i++) {
                rtn[foundOld[i].columns.id].push(foundOld[i]);
              }
              sails.controllers.tickets.getTickets(req, res, true);
            });
          });
        });
    } else if (req.param('oldColumn') != req.param('newColumn') || req.param('oldPos') > req.param('newPos')) {
      // Ticket wird in eine neue Spalte verschoben, oder in der selben Spalte nach unten
      Tickets.find(
        {where: {project: req.param('project'), columns: req.param('newColumn'), position: {'>': req.param('newPos')}}}
      ).exec(function (err, ticketsNew) {
          if (err) {
            sails.log.error(err);
            return res.json('Server error', 500);
          }

          for (var i = 0; i < ticketsNew.length; i++) {
            ticketsNew[i].position = ticketsNew[i].position + 1;
            ticketsNew[i].save(function (err, saved) {
              if (err) {
                sails.log.error(err);
                return res.json('Server error', 500);
              }
            });
          }

          // Update moved ticket
          Tickets.update({id: req.param('ticketid')}, {columns: req.param('newColumn'), position: req.param('newPos')})
            .exec(function (err) {
              if (err) {
                sails.log.error(err);
                return res.json('Server error', 500);
              }

              // Update position of tickets in old column
              Tickets.find(
                {project: req.param('project'), columns: req.param('oldColumn'), position: {'>': req.param('oldPos')}}
              ).exec(function (err, ticketsOld) {
                  if (err) {
                    sails.log.error(err);
                    return res.json('Server error', 500);
                  }
                  for (var i = 0; i < ticketsOld.length; i++) {
                    ticketsOld[i].position = ticketsOld[i].position + 1;
                    ticketsOld[i].save(function (err, saved) {
                      if (err) {
                        sails.log.error(err);
                        return res.json('Server error', 500);
                      }
                    });
                  }

                  sails.controllers.tickets.getTickets(req, res, true);
                })
            });
        });
    }
  }

};

