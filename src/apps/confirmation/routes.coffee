Promise = require 'bluebird-q'
User = require '../../models/user'
Invitee = require '../../models/invitee'
cache = require '../../lib/cache'

@expired = (req, res) ->
  return res.redirect '/' if req.user?
  res.render 'expired'

@confirmed = (req, res, next) ->
  res.render 'confirmed'

@unconfirmed = (_err, _req, res, _next) ->
  res.render 'unconfirmed'