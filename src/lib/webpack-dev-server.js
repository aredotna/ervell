// @ts-check

const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../../webpack/webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(
  require('webpack-dev-middleware')(compiler, {
    quiet: true,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: 'errors-only',
  })
)

app.use(require('webpack-hot-middleware')(compiler))

module.exports = app
