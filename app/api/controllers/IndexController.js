/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res){
    sails.log.verbose("[IndexCtrl] Action 'index' called");
    res.sendfile(sails.config.paths.views + '/index.html');
	},

  singin: function (req, res){
    sails.log.verbose("[IndexCtrl] Action 'singin' called");
    res.sendfile(sails.config.paths.views + '/signin.html');
  }
};

