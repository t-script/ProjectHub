/**
* KanbanColumns.js
*
* @description :: Represents a kanban board of a project
*/

module.exports = {
  attributes: {
    project: {
      model: 'Project'
    },

    name: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 32
    },

    limit: {
      type: 'integer',
      required: true
    },

    position: {
      type: 'integer',
      required: true
    }
  }
};

