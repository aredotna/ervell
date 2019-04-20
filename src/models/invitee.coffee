{ extend } = require 'underscore'
{ API_URL } = require('sharify').data
Base = require './base.coffee'

module.exports = class Invitee extends Base
  url: ->
    "#{API_URL}/accounts/invitations/accept?invitation_token=#{@get('invitation_token')}"

  parse: (data) ->
    extend data, data.user

  sync: (method, model, options) ->
    switch method
      when 'update' then options.url = "#{API_URL}/accounts/invitations"
    super
