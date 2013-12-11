var foursquare = require('../../providers/foursquare');

exports.get = function(req, res) {
  foursquare.locations(req.query.lt, req.query.lg, function(data) {
    var locations = [];
    data.forEach(function(elm) {
      locations.push({
        id: elm.id,
        name: elm.name,
        latitude: elm.location.lat,
        longitude: elm.location.lng,
        distance: elm.location.distance
      });
    });
    res.send(locations);
  });
};

exports.test = function(req, res) {
  res.send([
    {
      id: 1,
      name: 'test-1',
      selected: false
    },
    {
      id: 2,
      name: 'test-2',
      selected: false
    },
    {
      id: 3,
      name: 'test-3',
      selected: false
    },
    {
      id: 4, 
      name: 'test-4',
      selected: false
    }
  ]);
};
