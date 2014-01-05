var config = require('./config.js');
var knox = require('knox');

var uploadImage = function(image, callback) {

  var client = knox.createClient(config);
  var headers = {};

  client.putFile(image.file, "/" + image.name,{ 'x-amz-acl': 'public-read' }, function(err, res) {

    if (err) console.log(err);

    if (callback) {
      callback(res);
    }
  });
};

module.exports = {
  uploadImage: uploadImage
};


