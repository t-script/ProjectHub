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
      type: 'string'
    },

    members: {
      type: 'json'
    }
  }
};

