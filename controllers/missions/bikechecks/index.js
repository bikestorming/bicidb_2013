var bikecheck = require('../../../models/missions/bikecheck');
var fs = require('fs');
var uuid = require('node-uuid');
var easyimage = require('easyimage');

exports.save = function(req, res) {

  var image_name = uuid.v1();
  var image_path =  image_name + ".jpg";
  var image = req.body.image.url.replace(/^data:image\/jpeg;base64,/,"");
  var thumbnail_path = image_name + '-thumbnail' + ".jpg"; 

  fs.writeFile("./images/" + image_path,new Buffer(image, "base64"), function(err) {
      var new_bikecheck = new bikecheck({
        _id: image_name,
        location: req.body.location,
        description: req.body.description,
        image: {
          original: '/images/' + image_path,
          thumbnail: '/images/' + thumbnail_path
        },
        user: req.body.user
      }); 

     easyimage.resize({
       src: "./images/" + image_path,
       dst: "./images/" + thumbnail_path,
       width: 100,
       height: 100
     }, function() {
     });

     new_bikecheck.save(function() {
      console.log('New Bikecheck');
    });
  });
   
  res.send(200);
};

exports.get = function(req, res) {
  bikecheck.find(function(err, models) {
    res.send(models);
  });
};
