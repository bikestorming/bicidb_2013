var config = require('./config.js');

var endpoints = {
  tags: 'https://api.instagram.com/v1/tags/{{tagName}}/media/recent?client_id=' + config.clientId
};

module.exports = endpoints;
