var instagram = require('../../../providers/instagram');
var moment = require('moment');
var bikecheckModel = require('../../../models/missions/bikecheck');

var fromInstagram = function(callback) {
  instagram.searchTag('bkBikecheck', function(raw_bikechecks) {
    var raw_bikechecks_length = raw_bikechecks.length;
    var new_bikechecks = [];
    var i;
    for(i=0;i<raw_bikechecks_length;i++) {
      var bkchk = raw_bikechecks[i];
      var new_bikecheck = {
        _id: bkchk.id,
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
        source:{
          id: bkchk.id,
          original: bkchk.link,
          network: "Instagram"
        },
        created_at: moment.unix(bkchk.created_time).toDate()
      };
      new_bikechecks.push(new_bikecheck);
    }

    callback(new_bikechecks);
  });
};

module.exports = {
  fromInstagram: fromInstagram
};
