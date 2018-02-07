global.Promise = require('bluebird');

require('coffee-register');
require('babel-register');

const throng = require('throng');
const express = require('express');

const { PORT } = require('./config.coffee');
const WORKERS = process.env.WEB_CONCURRENCY || 1;

const setup = require('./lib/setup.coffee');
const cache = require('./lib/cache.coffee');

const app = module.exports = express();

const startWorker = (id) => {
  console.log(`Started worker ${id}`);

  cache.setup(() => {
    setup(app);

    return app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      return typeof process.send === 'function' ? process.send('listening') : void 0;
    });
  });

  process.on('SIGTERM', () => {
    console.log(`Worker ${id} exiting`);
    process.exit();
  });
};

throng({
  workers: WORKERS,
  lifetime: Infinity,
}, startWorker);
