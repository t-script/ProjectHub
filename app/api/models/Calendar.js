/**
* Calendar.js
*
* @description :: Represents a calendar in ProjectHub
*/

module.exports = {

  attributes: {
    ticketid: {
      type: 'integer',
      required: true
    },

    title: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 32
    },

    description: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 100
    },

    approximatedTime: {
      type: 'integer'
    },

    currentTime: {
      type: 'integer'
    },

    fixedDate: {
      type: 'integer'
    },

    position: {
      type: 'integer'
    },

    category: {
      type: 'integer'
    },

    serviceClass: {
      type: 'integer'
    },

    columnsid: {
      type: 'integer'
    },

    userid: {
      type: 'integer'
    }
  }
};
