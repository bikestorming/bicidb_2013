exports.list = function(req, res)  {
  res.send({
    list: [{
      id: 3000 
    }]
  });
};

exports.mission = function(req, res) {
  res.send({
    id: 3000
  });
};
