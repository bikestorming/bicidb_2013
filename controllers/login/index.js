var routes = require('../../routes.js');

exports.restrict = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect(routes.login);
  }
};
