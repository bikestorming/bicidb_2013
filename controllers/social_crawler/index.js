var bikecheks = require('./bikechecks/instagram.js');
var bikecheckModel = require('../../models/missions/bikecheck');
var uuid = require('node-uuid');

var updateBikechecks = function(callback) {
  bikecheks.fromInstagram(function(bikechecks) {
    bikechecks.push({
      _id: uuid.v1(),
      name: "hola"
    });
    bikecheckModel.create(bikechecks, function(err) {
      callback(err, bikechecks);
    });
  });
};

var forceupdate = function(req, res) {
  updateBikechecks(function(err, result) {
    var response = {};
    response.data = result;
  
    if (err) console.log(err);

    res.send(response);
  });
};

module.exports = {
  updateBikechecks: updateBikechecks,
  forceupdate: forceupdate
};
