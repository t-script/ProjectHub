/**
* User.js
*
* @description :: Represents a user of ProjectHub
*/

module.exports = {

  attributes: {
  	username: {
  		type: 'string',
  		unique: true,
  		required: true,
  		minLength: 3,
  		maxLength: 32,
  		alphanumeric: true
  	},

  	firstname: {
  		type: 'string',
  		minLength: 3,
  		maxLength: 32,
  	},

  	lastname: {
  		type: 'string',
  		minLength: 3,
  		maxLength: 32,
  	},

  	email: {
  		type: 'email',
  		required: true,
  	},

  	password: {
  		type: 'string',
  		required: true,
  		minLength: 5,
  	},

  	settings: {
  		type: 'json'
  	},

  	active: {
  		type: 'boolean',
  		required: true,
      defaultsTo: false,
  	},
  },

  // Before saving to db hash password
  beforeCreate: function(values, cb){
    var bcrypt = require('bcryptjs');

    bcrypt.hash(values.password, 10, function(err, hash){
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};

