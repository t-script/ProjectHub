/**
 * LoginController
 *
 * @description :: Used to login or logout user
 */

module.exports = {
	login: function (req, res) {
		sails.log.info('Login Controller with action "login" called.');
		var bcrypt = require('bcryptjs');

		//Check if username or password were entered
		if (!req.body.username || !req.body.password){
			sails.log.info('No username or password provided');
			return res.json({ error: 'You need to enter username and password' }, 500);
		} 

		// Search one user by username
		User.findOneByUsername(req.body.username).exec(function(err, user){
			// Return if an error occoured
			if (err){
				sails.log.error(err);
				return res.json({ error: 'Server error' }, 500);
			}

			// Return if no user was found
			if (!user) {
				sails.log.info('Username "'+req.body.username+'" not found.');
				return res.json({ error: 'User not found' }, 404);
			}

			// Check password
			bcrypt.compare(req.body.password, user.password, function(err, match){
				// Return if an error occoured
				if (err){
					sails.log.error(err);
					return res.json({ error: 'Server error' }, 500);
				}

				// If passwords match log user in, else return an error
				if (match){
					sails.log.info('User "'+req.body.username+'" logged in!');
					req.session.authenticated = true;
					return res.json(user);
				}else{
					sails.log.info('Invalid password');
					req.session.authenticated = false;
					return res.json({ error: 'Invalid password' }, 400);
				}
			});
		});
	},

	logout: function(req, res){
		sails.log.info('Login Controller with action "logout" called.');
		sails.log.info('User "'+ '' +'" logged out!');
		req.session.authenticated = false;
		return res.json('logged out!', 200);
	},
};
