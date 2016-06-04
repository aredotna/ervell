Invitee = require '../../models/invitee'
{ parse } = require 'url'

@acceptInvitation = (req, res, next) ->
  next() if req.user
  invitee = new Invitee invitation_token: req.params.token
  invitee.fetch
    success: ->
      invitee.set invitation_token: req.query.invite_token
      res.locals.sd.INVITEE = invitee.toJSON()
      res.render 'index', invitee: invitee
    error: ->
      next()