var mongoose = require('mongoose');

var bikecheck = new mongoose.Schema({
  _id: String,
  source: String,
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
  instagram_id: {
    type: String,
    index: {
      unique: true
    }
  },
  created_at: String
});

module.exports = mongoose.model('bikecheck', bikecheck);
