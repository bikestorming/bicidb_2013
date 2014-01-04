var bikecheks = require('./bikechecks/instagram.js');
var bikecheckModel = require('../../models/missions/bikecheck');

var updateBikechecks = function(callback) {
  var new_bikechecks = [];
  bikecheks.fromInstagram(function(bikechecks) {
    bikecheckModel.create(bikechecks, function() {
      if (callback) {
        callback();
      }
    });
  });
};

var forceupdate = function(req, res) {
  updateBikechecks(function() {
    res.send('Bikechecks actualizados!');
  });
};

module.exports = {
  updateBikechecks: updateBikechecks,
  forceupdate: forceupdate
};
