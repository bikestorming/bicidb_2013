var endpoints = {
  root: '/',
  bikestormers: {
    all: '/bikestormers',
    single: '/bikestormers/:id',
    social: '/bikestormers/:network/:token'
  },
  locations: {
    all: '/locations',
    single: '/locations/:id',
    test: '/locations-test'
  },
  missions: {
    bikecheck: '/missions/bikechecks'
  },
  social_crawler: {
    force: {
      bikecheck: '/social_crawler/force/bikecheck'
    }
  }
};

module.exports = endpoints;
