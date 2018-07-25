Backbone = require 'backbone'

module.exports = class AuthenticationRouter extends Backbone.Router
  routes:
    'confirm/expired': require './expired.coffee'
    'confirm/:token': require './confirm.coffee'