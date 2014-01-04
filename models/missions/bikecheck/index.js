var mongoose = require('mongoose');

var bikecheck = new mongoose.Schema({
  description: {
    value: String
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
  source: {
    provider: String,
    id: {
      type: String,
      index: true,
      unique: true,
      dropDups: true
    }
  },
  created_at: String
});

module.exports = mongoose.model('bikecheck', bikecheck);
