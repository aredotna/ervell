#
# Overriding Backbone.sync to include auth_token
#

Backbone = require "backbone"
Backbone.sync = require "backbone-super-sync"
_ = require 'underscore'

module.exports = (req, res, next) ->
  if req.user?
    sync = Backbone.sync
    Backbone.sync = (method, model, options) ->
      options.headers ?= {}
      options.headers['X-AUTH-TOKEN'] = req.user.get('authentication_token')
      sync method, model, options

  res.locals._ = _
  next()
