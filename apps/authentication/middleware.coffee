qs = require 'qs'
url = require 'url'
request = require 'superagent'
{ API_URL } = require('sharify').data

@return = (req, res) ->
  referrer = url.parse req.get('Referrer') or '/'
  query = qs.parse referrer.query

  res.redirect query['redirect-to'] or referrer.path or '/'

@logout = (req, _res, next) ->
  req.logout()

  next()

@confirm = (req, res, next) ->
  return next() unless req.user?.get('is_pending_confirmation')

  request
    .post "#{API_URL}/confirmations/confirm?token=#{req.params.token}"
    .set 'Accept', 'application/json'
    .end (err) ->
      return next(err) if err?

      next()

@confirmable = (req, res, next) ->
  request
    .get "#{API_URL}/confirmations"
    .set 'Accept', 'application/json'
    .end (err, response) ->
      return next(err) if err?

      console.log response

      res.json response
