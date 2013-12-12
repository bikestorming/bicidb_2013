var mongoose = require('mongoose');

var bikecheck = new mongoose.Schema({
  description: {
    value: String
  },
  location: {
    name: String,
    latitude: String,
    longitude: String
  },
  image: {
    original: String,
    thumbnail: String
  }
});

module.exports = mongoose.model('bikecheck', bikecheck);
