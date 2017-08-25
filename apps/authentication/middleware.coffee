request = require 'superagent'
{ API_URL } = require('sharify').data

@logout = (req, _res, next) ->
  req.logout()
  next()

@confirm = (req, res, next) ->
  request
    .post "#{API_URL}/confirmations/confirm?token=#{req.params.token}"
    .set 'Accept', 'application/json'
    .end (err) ->
      return next(err) if err?

      next()
