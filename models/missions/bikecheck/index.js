var mongoose = require('mongoose');

var bikecheck = new mongoose.Schema({
  _id: String,
  description: {
    value: String
  },
  source: {
    network: String,
    original: String,
  },
  user: {
    email: String,
    social: {
      instagram: {
        id: String,
        username: String
      }
    }
  },
  location: {
    name: String,
    latitude: String,
    longitude: String
  },
  image: {
    original: String,
    thumbnail: String
  },
  created_at: String
});

module.exports = mongoose.model('bikecheck', bikecheck);
