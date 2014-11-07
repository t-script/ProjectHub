/**
 * isLoggedOut
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any logged out user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = false;`
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (!req.session.authenticated) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  res.redirect('/start');
  return;
};
