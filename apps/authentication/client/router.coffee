Backbone = require 'backbone'

module.exports = class AuthenticationRouter extends Backbone.Router
  routes:
    'sign_up': require './sign_up.coffee'
    'log_in': require './log_in.coffee'
    'forgot': require './forgot.coffee'
    'reset/:token': require './reset.coffee'
