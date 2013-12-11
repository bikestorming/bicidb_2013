var mocha = require('mocha');
var chai = require('chai');
var superagent = require('superagent');

var endpoints = require('../endpoints');


describe('The #bikecheck mission', function() {
  it('Should allow the user to select a place near of its location', function(done) {
    superagent.get(endpoints.missions)
  });
});
