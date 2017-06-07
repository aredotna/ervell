_ = require 'underscore'
sd = require('sharify').data
Base = require './base.coffee'

module.exports = class Authentication extends Base

  url: -> "#{sd.API_URL}/accounts/authentications/friends?service=#{@get('provider')}"

  sync: (method, model, options) ->
    switch method
      when 'create' then options.url = "#{sd.API_URL}/accounts/authentications"
      when 'delete' then options.url = "#{sd.API_URL}/accounts/authentications/#{@id}"
    super

  action: ->
    if @get('created_at')? then 'disconnect' else 'connect'

  actionReadable: ->
    if @get('created_at')? then 'Disconnect from' else 'Connect to'
    