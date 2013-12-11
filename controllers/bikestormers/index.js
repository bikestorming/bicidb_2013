var bikestormer = require('../../models/bikestormer');

exports.get = function(req, res) {
  bikestormer.find(function(err, bikestormers) {
    res.send(bikestormers);
  });
};
