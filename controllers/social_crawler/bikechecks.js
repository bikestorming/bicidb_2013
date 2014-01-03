var instagram = require('../../providers/instagram');

var fromInstagram = function(callback) {
  instagram.searchTag('bkBikecheck', function(bikechecks) {
    callback(bikechecks);
  });
};

module.exports = {
  fromInstagram: fromInstagram
};
