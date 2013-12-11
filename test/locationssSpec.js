var mocha = require('mocha');
var chai = require('chai');
var superagent = require('superagent');
var expect = chai.expect;

var endpoints = require('../endpoints');

describe('The Locations', function() {
  it('Can be fetched specifying the latitude and longitude', function(done) {
    superagent
      .get(endpoints.locations.all)
      .send({
        ll: "44.3,37.2"
      })
      .end(function(res) {
        expect(res.status).to.equals(200);
        done();
      });
  });
});
