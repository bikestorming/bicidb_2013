 superagent = require('superagent');
var users = require('../models/users');

var user;

var foursquare = {
  'clientId' : 'DRFJXSS5URHG3GDTXTUX0HYON3AS3YF3Y0A0N0VFQQR3Z5DR',
  'clientSecret' : 'Q1DWNQCZOOJ0ZE4I24OLHAW05RTQKICPFEDQYZQYU4YGFZH5',
  'redirectUrl' : 'http://mobile.bikestorming.com:3000/foursquare'
};


exports.login =  function(req, res) {
  var code = req.query.code;
  if (code) {
    superagent.get('https://foursquare.com/oauth2/access_token?client_id='+ foursquare.clientId + '&client_secret=' + foursquare.clientSecret + '&grant_type=authorization_code&redirect_uri=http://mobile.bikestorming.com:8000&code=' + code).end(function(req) {
      var oauth_token = req.body.access_token;
      
      users.user.findOne({
          foursquare: oauth_token
        }, '_id').exec(function(err, model) {
          if (model === null) {
            var new_user = new users.user({
              foursquare: oauth_token
            }); 
            new_user.save(function(err, user_created) {
              user = user_created;
              res.redirect("http://mobile.bikestorming.com:8000/?user_id=" + user._id);
            });
          } else {
            user = model;
            res.redirect("http://mobile.bikestorming.com:8000/?user_id=" + user._id);
          } 
        });

    }); 
  } else {
      res.redirect("https://foursquare.com/oauth2/authenticate?client_id=" + foursquare.clientId + "&response_type=code&redirect_uri=" +  foursquare.redirectUrl
    );
  }
};

exports.near = function(req, res) {
  var latitude = req.query.lt;
  var longitude = req.query.lg;
  if(req.query.lt && req.query.lg) {
    users.user.findById(req.params.id, function(err, model) {
      superagent.get('https://api.foursquare.com/v2/venues/search?client_id='+ foursquare.clientId + '&client_secret=' + foursquare.clientSecret + '&v=20132610&ll=' + latitude + "," + longitude).end(function(req) {
        var places=[];
        req.body.response.venues.forEach(function(place) {
          places.push({
            id: place.id,
            name: place.name
          });
        });
        res.send(places);
      });  
    });
  } else {
    res.send({error: "provide lat and long"});
  }
};

exports.bikecheck = function(req, res) {
  users.user.findById(req.params.id, function(err, model) {
    superagent.post('https://api.foursquare.com/v2/checkins/add?oauth_token=' + model.foursquare + '&v=20130815&venueId=' + req.body.place + '&shout=' + req.body.message + " %23bikecheck&broadcast=facebook,twitter").end(function(req) {
      res.send({id: req.body.response.checkin.id});
    });
  });
};

exports.checkins = function(req, res) {
  users.user.findById(req.params.id, function(err, model) {
    superagent.get('https://api.foursquare.com/v2/users/self/checkins?oauth_token=' + model.foursquare + "&v=20130815&afterTimestamp=1279044824").end(function(req) {
      var bikechecks = {
        list: []
      };
      req.body.response.checkins.items.forEach(function(item) {
        var shout = item.shout;
        if (shout !== undefined && item.shout.indexOf("#bikecheck") !== -1) {
          bikechecks.list.push({
            place: item.venue.name,
            message: item.shout
          });
        }
      });

      res.send(bikechecks);
    });
  });
};





