#
# Overriding Backbone.sync to include auth_token
#

Backbone = require "backbone"
Backbone.sync = require "backbone-super-sync"

module.exports = (p_req, res, next) ->

  Backbone.sync.editRequest = (req) ->
    if p_req.user?
      req.set('X-AUTH-TOKEN': p_req.user.get('authentication_token'))

  next()