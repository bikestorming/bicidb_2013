var bikecheks = require('./bikechecks.js');
var bikecheckModel = require('../../models/missions/bikecheck');

var updateBikechecks = function() {
  bikecheks.fromInstagram(function(raw_bikechecks) {
    raw_bikechecks.forEach(function(bkchk) {
      var new_bikecheck = new bikecheckModel({
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
      });
      new_bikecheck.save(function() {
        console.log('New Bikecheck');
      });
    });
  });
};

module.exports = {
  updateBikechecks: updateBikechecks
};
