Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../../lib/mediator.coffee'

module.exports = class AuthRouter extends Backbone.Router

  routes:
    'log_in': 'login'
    'sign_up': 'signup'

  login: ->
    mediator.trigger 'open:auth', mode: 'login'

  signup: ->
    mediator.trigger 'open:auth', mode: 'register'

  forgot: ->
    mediator.trigger 'open:auth', mode: 'forgot'