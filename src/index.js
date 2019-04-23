/* eslint-disable no-console */

require('regenerator-runtime/runtime')
require('newrelic')
require('coffee-register')
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
})

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
