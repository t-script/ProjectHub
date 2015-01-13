/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  getUsername: function (req, res) {
    sails.log.info("[UserCtrl] Action 'updateUser' called");
    res.json(req.session.user, 200);
  },

  updateUser: function (req, res) {
    sails.log.info("[UserCtrl] Action 'updateUser' called");
    if (!req.body.id) {
      sails.log.info('No user provided');
      return res.json({error: 'You need to enter an id'}, 500);
    }

    User.update({id: req.body.id},
      {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email})
      .exec(function afterwards(err) {
        if (err) {
          sails.log.error(err);
          return res.json({error: 'There was an error'}, 500);
        }
        req.session.user.firstname= req.body.firstname;
        req.session.user.lastname= req.body.lastname;
        req.session.user.email= req.body.email;
        return res.json(req.session.user, 200);
      })
  }
};

