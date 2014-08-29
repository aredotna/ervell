#
# Middleware to handle internal errors
#

_ = require 'underscore'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
template = undefined

render = (res, data) ->
  res.send jade.compile(fs.readFileSync(template), filename: template)(data)

module.exports = (err, req, res, next) ->
  console.log 'path', path
  template = path.resolve(__dirname, '../../components/layout/templates/error.jade')

  console.log 'error', err

  res.status err.status or 500
  data = _.extend
    code: res.statusCode
    error: err
    detail: err.message or err.text or err.toString()
    sd: {}
  , res.locals
  render res, data