path = require 'path'
config = require '../config'

module.exports = (app, onReload, appPath) ->
  unless config.NODE_ENV is 'development'
    throw new Error 'NODE_ENV must be set to "development"'

  appPath = appPath or path.join __dirname, '../' # Defaults to app root
  watcher = require('chokidar').watch appPath

  watcher.on 'ready', ->
    watcher.on 'all', ->
      Object.keys(require.cache).forEach (id) ->
        if id.startsWith appPath
          delete require.cache[id]

  currentResponse = null
  currentNext = null

  app.use (req, res, next) ->
    currentResponse = res
    currentNext = next

    res.on 'finish', ->
      currentResponse = null
      currentNext = null

    next()

  process.on 'uncaughtException', (error) ->
    unless currentResponse
      process.abort()

    currentNext error
    currentResponse = null
    currentNext = null

  app.use (req, res, next) ->
    onReload req, res, next

  app
