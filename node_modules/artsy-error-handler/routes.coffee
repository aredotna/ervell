_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'

render = (res, data) =>
  res.send jade.compile(fs.readFileSync(@template), filename: @template)(data)

@pageNotFound = (req, res, next) ->
  err = new Error
  err.status = 404
  err.message = 'Not Found'
  next err

@internalError = (err, req, res, next) ->
  console.warn err.stack
  res.status err.status or 500
  detail = (err.message or err.text or err.toString())
  render res, _.extend
    code: res.statusCode
    error: err
    detail: detail
  , res.locals

@socialAuthError = (err, req, res, next) ->
  if err.toString().match('User Already Exists')
    # Error urls need to be compatible with Gravity
    params =
      if req.url?.indexOf('facebook') > -1
        "?account_created_email=facebook"
      else if req.url?.indexOf('twitter') > -1
        "?account_created_email=twitter"
      else
        "?error=already-signed-up"
    res.redirect "/log_in#{params}"
  else if err.toString().match('Failed to find request token in session')
    res.redirect '/log_in?error=account-not-found'
  else if err.toString().match('twitter denied')
    res.redirect '/log_in?error=twitter-denied'
  else if err.toString().match("Another Account Already Linked: Twitter")
    res.redirect '/user/edit?error=twitter-already-linked'
  else if err.toString().match("Another Account Already Linked: Facebook")
    res.redirect '/user/edit?error=facebook-already-linked'
  else if err.toString().match "Could not authenticate you"
    res.redirect '/user/edit?error=could-not-auth'
  else
    next err

@loginError = (err, req, res, next) ->
  res.status switch err.message
    when 'invalid email or password' then 403
    else 500
  res.send { error: err.message }

@backboneErrorHelper = (req, res, next) ->
  res.backboneError = (model, err) ->
    try
      message = JSON.parse(err.text).error
    catch e
      message = err?.text or err?.response?.text or err?.stack or err?.message
      message ?= try JSON.stringify(err) catch e; 'Unknown Error'
    if err?.status in [404, 403, 401]
      status = 404
      message = 'Not Found'
    else
      status = err?.status or 500
    err = new Error
    err.message = message
    err.status = status
    next err
  next()