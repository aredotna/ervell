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

// app.use(require('webpack-hot-middleware')(compiler));

// Testbed for various configurations
app.get('/webpack', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Webpack Test</title>
      </head>
      <body>
        <div id='react-root' />
        <script src='/assets/common.js'></script>
        <script src='/assets/webpack.js'></script>
      </body>
    </html>
  `);
});

module.exports = app;
