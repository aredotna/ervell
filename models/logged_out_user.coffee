_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
User = require './user.coffee'

# Since this model gets initialized in a logged out state,
# to persist any changes to it we have to manually inject
# the access token after a login takes place
injectToken = (success) ->
  _.wrap success, (success, model, response, options) ->
    $.ajaxSettings.headers = _.extend ($.ajaxSettings.headers or {}),
      'X-ACCESS-TOKEN': response.user?.accessToken
    success model, response, options

module.exports = class LoggedOutUser extends User
  url: ->
    "#{sd.API_URL}/accounts"

  login: (options = {}) ->
    settings = _.defaults options,
      url: '/me/sign_in'
      success: injectToken(options.success or (->))

    new Backbone.Model()
      .save (@pick 'email', 'password'), settings

  signup: (options = {}) ->
    settings = _.defaults options,
      url: "#{sd.API_URL}/registrations"

    new Backbone.Model().save (@pick 'email', 'code'), settings

  forgot: (options = {}) ->
    settings = _.defaults options,
      url: "#{sd.API_URL}/accounts/passwords/forgot"
    new Backbone.Model().save (@pick 'email'), settings