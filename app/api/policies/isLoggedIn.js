/**
 * isLoggedIn
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any logged in user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  }

  // User is not allowed
  res.redirect('/start');
  return;
};
