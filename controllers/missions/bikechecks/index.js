var bikecheck = require('../../../models/missions/bikecheck');
var fs = require('fs');
var uuid = require('node-uuid');

exports.save = function(req, res) {

  var image_name =  uuid.v1() + ".jpg";
  var image = req.body.image.url.replace(/^data:image\/jpeg;base64,/,"");
  fs.writeFile("./images/" + image_name,new Buffer(image, "base64"), function(err) {
      var new_bikecheck = new bikecheck({
        location: req.body.location,
        description: req.body.description,
        image: {
          url: '/images/' + image_name
        }
      }); 
     new_bikecheck.save(function() {
      console.log('se salvo!');
    });
  });
       
   
  res.send(200);
};

exports.get = function(req, res) {
  bikecheck.find(function(err, models) {
    res.send(models);
  });
};
