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
  return next() unless req.user?

  req.user.fetch
    error: next
    success: ->
      req.login req.user, (err) ->
        return next(err) if err?

        user = new User req.user.attributes
        cache.del "#{user.url()}{}"

        res.json req.user.attributes
