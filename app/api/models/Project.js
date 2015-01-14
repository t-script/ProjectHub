/**
* Project.js
*
* @description :: Represents a project of ProjectHub
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 100
    },

    leader: {
      model: 'User'
    },

    members: {
      collection: 'User'
    }
  },

  // Create standard columns of kanban board
  afterCreate: function(obj, cb){
    KanbanColumns.create([
      {project: obj.id, name: 'Backlog', limit: 0, position: 0},
      {project: obj.id, name: 'Ready', limit: 5, position: 1},
      {project: obj.id, name: 'In Progress', limit: 4, position: 2},
      {project: obj.id, name: 'Done', limit: 0, position: 3}
    ]).exec(function(err, columns){
      if (err) return cb(err);
      cb();
      // INSERT TEST DATA
      /*
      Tickets.create([
        {ticketid: 1, title: 'Ticket1', description: 'Test Ticket', position: 1, columns: columns[0].id, user: 15, project: obj.id},
        {ticketid: 2, title: 'Ticket2', description: 'Test Ticket', position: 2, columns: columns[0].id, user: 15, project: obj.id},
        {ticketid: 3, title: 'Ticket3', description: 'Test Ticket', position: 3, columns: columns[0].id, user: 15, project: obj.id},
        {ticketid: 4, title: 'Ticket4', description: 'Test Ticket', position: 4, columns: columns[0].id, user: 15, project: obj.id},
        {ticketid: 5, title: 'Ticket5', description: 'Test Ticket', position: 1, columns: columns[1].id, user: 15, project: obj.id},
        {ticketid: 6, title: 'Ticket6', description: 'Test Ticket', position: 2, columns: columns[1].id, user: 15, project: obj.id},
        {ticketid: 7, title: 'Ticket7', description: 'Test Ticket', position: 1, columns: columns[2].id, user: 15, project: obj.id},
        {ticketid: 8, title: 'Ticket8', description: 'Test Ticket', position: 2, columns: columns[2].id, user: 15, project: obj.id},
        {ticketid: 9, title: 'Ticket9', description: 'Test Ticket', position: 3, columns: columns[2].id, user: 15, project: obj.id},
      ]).exec(function(err, columns) {
        if (err) return cb(err);
        cb();
      });*/
    });
  }
};

