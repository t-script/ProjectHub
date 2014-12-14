/**
* Calendar.js
*
* @description :: Represents a calendarEvent in ProjectHub
*/

module.exports = {

  attributes: {
    eventid: {
      type: 'integer',
      required: true
    },

    title: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 32
    },

    start: {
      type: 'date',
      required: true
    },

    end: {
      type: 'date',
      required: true
    },

    userid: {
      type: 'integer'
    },

    projectid: {
      type: 'integer'
    }
  }
};

