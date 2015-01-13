/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  getUsername: function (req, res) {
    res.json(req.session.user, 200);
  }
};

