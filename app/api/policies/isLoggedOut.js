/**
 * isLoggedOut
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any logged out user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = false;`
 *
 */
module.exports = function(req, res, next) {
  sails.log.verbose("Policy 'isLoggedOut' called");
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (!req.session.authenticated) {
    sails.log.verbose("[isLoggedOutPolicy] User is logged out!");
    return next();
  }

  // User is not allowed
  sails.log.verbose("[isLoggedOutPolicy] User is not logged out!");
  res.redirect('/');
  return;
};
