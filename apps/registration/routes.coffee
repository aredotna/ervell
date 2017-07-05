Invitee = require '../../models/invitee'

@acceptInvitation = (req, res, next) ->
  return res.redirect('/') if req.user?

  invitee = new Invitee invitation_token: req.params.token
  invitee.fetch
    error: ->
      next()

    success: ->
      invitee.set invitation_token: req.query.invite_token

      res.locals.sd.INVITEE = invitee.toJSON()
      res.render 'index',
        invitee: invitee

@invalidInvitation = (req, res, next) ->
  res.render 'invalid'
