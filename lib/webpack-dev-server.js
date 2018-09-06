const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: true,
  publicPath: config.output.publicPath,
  serverSideRender: true,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

module.exports = app;
