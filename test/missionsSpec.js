var mocha = require('mocha');
var chai = require('chai');
var superagent = require('superagent');

var expect = chai.expect;

describe('The BikeStorming missions', function() {
  var mission;

  it('Should be retrieved by a list', function(done) {
    superagent.get('http://localhost:3000/missions').end(function(req, res) {
      expect(res.body.list.length).to.exist;
      mission = res.body.list[0];
      done();
    })
  });

  it('Should be retrieved individually', function(done) {
    superagent.get('http://localhost:3000/missions/' + mission.id).end(function(req, res){
      expect(res.body.id).to.equal(mission.id);
      done();
    });
  });
});
