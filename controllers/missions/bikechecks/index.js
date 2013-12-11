var bikecheck = require('../../../models/missions/bikecheck');

exports.save = function(req, res) {
  var new_bikecheck = new bikecheck(req.body); 
  console.log(req.body);

  new_bikecheck.save(function() {
    console.log('se salvo!');
  });

  res.send(200);
};

exports.get = function(req, res) {
  bikecheck.find(function(err, models) {
    res.send(models);
  });
};
