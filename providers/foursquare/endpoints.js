var config = require('./config.js');

var endpoints = {
  request_code: 'https://foursquare.com/oauth2/authenticate?client_id=' + config.clientId +'&response_type=code&redirect_uri={{redirect_url}}',

  request_token: 'https://foursquare.com/oauth2/access_token?client_id='+ config.clientId +'&client_secret=' + config.clientSecret+ '&grant_type=authorization_code&redirect_uri={{redirect_url}}&code={{code}}',

  locations: 'https://api.foursquare.com/v2/venues/search?ll={{latlong}}&client_id=' + config.clientId + '&client_secret=' + config.clientSecret + '&v=' + config.version
};

module.exports = endpoints;
