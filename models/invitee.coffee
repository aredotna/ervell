Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'

module.exports = class Invitee extends Base

  url: -> "#{sd.API_URL}/accounts/invitations/accept?invitation_token=#{@get('invitation_token')}"

  parse: (data) ->
    _.extend data, data.user

  sync: (method, model, options) ->
    switch method
      when 'update' then options.url = "#{sd.API_URL}/accounts/invitations"
    super