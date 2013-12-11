var superagent = require('superagent');

var endpoints = require('./endpoints.js');



var request_code = function(redirect_url, callback) {
 superagent.get(endpoints.request_code.replace('{{redirect_url}}', redirect_url)).end(function(res) {
   callback(res.body.code);
 });
};

var request_token = function(code, redirect_url, callback) {
  superagent.get(endpoints.request_token.replace('{{redirect_url}}', redirect_url).replace('{{code}}', code)).done(function(res, req) {
    callback();
  });
};

var locations = function(latitude, longitude, callback) {
  superagent.get(endpoints.locations.replace('{{latlong}}', latitude + "," + longitude))
  .end(function(res) {
    callback(res.body.response.venues);
  });
};

module.exports = {
  locations: locations
};

