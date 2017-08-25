Promise = require 'bluebird-q'
User = require '../../models/user'
cache = require '../../lib/cache'

@sign_up = (req, res) ->
  return res.redirect '/' if req.user?
  res.render 'sign_up'

@log_in = (req, res) ->
  return res.redirect '/' if req.user?

  res.locals.sd.REDIRECT_TO = req.query['redirect-to'] or '/'
  res.render 'log_in'

@forgot = (req, res) ->
  return res.redirect '/' if req.user?
  res.render 'forgot'

@reset = (req, res) ->
  return res.redirect '/' if req.user?
  res.render 'reset',
    token: req.params.token

@expired = (req, res) ->
  return res.redirect '/' if req.user?
  res.render 'expired'

@refresh = (req, res, next) ->
  return next() unless (user = req.user)?

  Promise user.fetch()
    .then (response) ->
      req.login user, (err) ->
        return next(err) if err?

        # IMPORTANT: return the `response` instead of the `user.toJSON()`
        # Why? Because `user.toJSON()` is already parsed. Returning
        # an already parsed response will make it unparesable.
        res.json response

    .catch next
