var bikecheks = require('./bikechecks.js');
var bikecheckModel = require('../../models/missions/bikecheck');

var updateBikechecks = function(callback) {
  var new_bikechecks = [];
  bikecheks.fromInstagram(function(raw_bikechecks) {
    var raw_bikechecks_length = raw_bikechecks.length;
    var i;
    for(i=0;i<raw_bikechecks_length;i++) {
      var bkchk = raw_bikechecks[i];
      var new_bikecheck = {
        image: {
          original: bkchk.images.standard_resolution.url,
          thumbnail: bkchk.images.thumbnail.url
        },
        description: {
          value: bkchk.caption.text
        },
        location: {
          name: bkchk.location.name,
          latitude: bkchk.location.latitude,
          longitude: bkchk.location.longitude
        },
        user: {
          social: {
            instagram: {
              id: bkchk.user.id,
              username: bkchk.user.username,
            }
          }
        },
        source: {
          provider: 'Instagram',
          id: bkchk.id
        },
        created_at: bkchk.created_time
      };
      new_bikechecks.push(new_bikecheck);

    }

    bikecheckModel.create(new_bikechecks, function() {
      if (callback) {
        callback();
      }
    });
  });
};

var forceupdate = function(req, res) {
  updateBikechecks(function() {
    res.send('Bikechecks actualizados!');
  });
};

module.exports = {
  updateBikechecks: updateBikechecks,
  forceupdate: forceupdate
};
