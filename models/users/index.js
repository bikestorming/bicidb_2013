var mongoose = require('mongoose');

var user = new mongoose.Schema({
  foursquare: String
});

exports.user = mongoose.model('user', user) ;
