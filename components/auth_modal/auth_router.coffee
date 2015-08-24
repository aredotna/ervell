_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
AuthModalView = require './view.coffee'

module.exports = class AuthRouter extends Backbone.Router
  defaults:
    width: '500px'

  routes:
    'log_in': 'login'
    'sign_up': 'signup'

  login: ->
    @openModal mode: 'login'

  signup: ->
    @openModal mode: 'signup'

  forgot: ->
    @openModal mode: 'forgot'

  openModal: (options) ->
    options = _.defaults options, @defaults
    mediator.trigger 'open:auth', options
    @modal = new AuthModalView options