var mongoose = require('mongoose');

var bikestormer = new mongoose.Schema({
  social: {
    foursquare: String
  }
});

module.exports = mongoose.model('bikestormer', bikestormer) ;
