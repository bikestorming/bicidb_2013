var mocha = require('mocha');
var chai = require('chai');
var superagent = require('superagent');
var expect = chai.expect;

var endpoints = require('../endpoints');

describe('The Bikestormers', function() {
  it('Can be fetched', function(done) {
    superagent
      .get(endpoints.bikestormers.all)
      .end(function(res) {
        expect(res.status).to.equals(200);
        done();
      });
  });

  it('Can be created', function(done) {
    superagent
      .post(endpoints.bikestormers.single)
      .send({
        social: {
          test: 0
        }
      })
      .end(function(error, res) { 
        expect(error).to.equals(null);
        expect(res.body.id).to.be.a('string'); 
        done();
      });
  });
});
