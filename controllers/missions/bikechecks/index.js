var bikecheck = require('../../../models/missions/bikecheck');
var amazonS3 = require('../../../providers/aws');
var fs = require('fs');
var uuid = require('node-uuid');
var easyimage = require('easyimage');
var emoranking = require('../../../helpers/emoranking.js');

exports.save = function(req, res) {

  var image_name = uuid.v1();
  var image_path =  image_name + ".jpg";
  var image = req.body.image.url.replace(/^data:image\/jpeg;base64,/,"");
  var thumbnail_path = image_name + '-thumbnail' + ".jpg"; 
  var image_buffer = new Buffer(image, "base64");

  
  fs.writeFile("./images/" + image_path,new Buffer(image, "base64"), function(err) {
    amazonS3.uploadImage({
      file: './images/' + image_path,
      name: image_path
    }, function(res) {
      var new_bikecheck = new bikecheck({
        _id: image_name,
        location: req.body.location,
        description: req.body.description,
        emoranking: emoranking.get(req.body.description.value),
        image: {
          original: 'https://bikechecks-images.s3.amazonaws.com/' + image_path,
          thumbnail: 'https://bikechecks-images.s3.amazonaws.com/' + thumbnail_path
        },
        user: req.body.user
      }); 

      easyimage.resize({
       src: "./images/" + image_path,
       dst: "./images/" + thumbnail_path,
       width: 100,
       height: 100
     }, function(err) {
        if (err) console.log(err);
        amazonS3.uploadImage({
          file: './images/' + thumbnail_path,
          name: thumbnail_path
        }); 
     });

      new_bikecheck.save(function() {
        console.log('New Bikecheck');
      });

    });
  });

  res.send(200);
};

exports.get = function(req, res) {
  bikecheck.find(function(err, models) {
    res.send(models);
  });
};
