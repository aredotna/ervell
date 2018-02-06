global.Promise = require('bluebird');

require('coffee-register');
require('babel-register');

const express = require('express');

const { PORT } = require('./config.coffee');
const setup = require('./lib/setup.coffee');
const cache = require('./lib/cache.coffee');

const app = module.exports = express();

cache.setup(function() {
  setup(app);

  return app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
    return typeof process.send === 'function' ? process.send('listening') : void 0;
  });
});
