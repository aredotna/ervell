Promise = require 'bluebird-q'
User = require '../../models/user'
Invitee = require '../../models/invitee'
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

@confirmed = (req, res, next) ->
  res.render 'confirmed'

@unconfirmed = (_err, _req, res, _next) ->
  res.render 'unconfirmed'

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

@acceptInvitation = (req, res, next) ->
  return res.redirect '/' if req.user?

  invitee = new Invitee invitation_token: req.params.token
  Promise invitee.fetch()
    .then ->
      invitee.set invitation_token: req.query.invite_token

      res.locals.sd.INVITEE = invitee.toJSON()
      res.render 'accept_invitation',
        invitee: invitee

    .catch next

@invalidInvitation = (_err, _req, res, _next) ->
  res.render 'invalid_invitation'
