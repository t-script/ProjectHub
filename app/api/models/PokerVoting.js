/**
* PrivateChatMsg.js
*
* @description :: Represents a user of ProjectHub
*/

module.exports = {
  attributes: {
    open: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },

    votes: {
      type: 'json',
      required: true
    },

    ticket: {
      model: 'tickets'
    },

    project: {
      model: 'project'
    }
  }
};

