var superagent = require('superagent');
var endpoints = require('./endpoints.js');

var searchTag = function(tag, callback) {
  var url = endpoints.tags.replace('{{tagName}}', tag);
  superagent.get(url).end(function(res){
    callback(res.body.data);
  });
};

module.exports = {
  searchTag: searchTag
};
