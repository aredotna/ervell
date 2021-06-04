/* eslint-disable no-console */

require('source-map-support').install()
require('regenerator-runtime/runtime')
require('newrelic')
require('sqreen')

/*
 * Apollo client uses Promise.prototype.finally,
 * but this isn't automatically polyfilled into
 * our app because Babel only polyfills features
 * if they're actually being used in our client code
 * (not in node_modules I guess).
 *
 * This manually includes the polyfill so that apollo
 * works.
 */
require('core-js/fn/promise/finally')

if (process.env.NODE_ENV === 'development') {
  require('coffee-register')
  require('@babel/register')({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  })
}

global.Promise = require('bluebird')

const throng = require('throng')
const express = require('express')

const CONFIG = require('./config.coffee')

const WORKERS = process.env.WEB_CONCURRENCY || 1
const PORT = process.env.PORT || CONFIG.PORT

const setup = require('./lib/setup.coffee')
const cache = require('./lib/cache.coffee')

const app = express()

const startWorker = id => {
  console.log(`Started worker ${id}`)

  cache.connect()
  setup(app)

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    // eslint-disable-next-line
    return typeof process.send === 'function'
      ? process.send('listening')
      : void 0
  })

  process.on('SIGTERM', () => {
    console.log(`Worker ${id} exiting`)
    process.exit()
  })
}

throng(
  {
    workers: WORKERS,
    lifetime: Infinity,
  },
  startWorker
)

module.exports = app
