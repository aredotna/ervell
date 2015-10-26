#
# Overriding Backbone.sync to include auth_token
#

Backbone = require "backbone"
Backbone.sync = require "backbone-super-sync"
_ = require 'underscore'

module.exports = (req, res, next) ->
  res.locals._ = _
  next()
