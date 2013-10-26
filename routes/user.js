var users = require('../models/users');

exports.find = function(req, res){
  users.user.findById(req.params.id, function(err, model) {
    res.send(model);
  });
};
