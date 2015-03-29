Base = require "./base.coffee"
sd = require("sharify").data

module.exports = class Storage extends Model

  initialize: ->
    @set 'accessToken', @getToken()

  getItem: (key) ->
    localStorage.getItem(key)

  setItem: (key, value) ->
    localStorage.setItem(key, value)
    @set key, value

  removeItem: (key) ->
    localStorage.removeItem(key)
    @unset key

  getToken: ->
    @getItem 'accessToken'

  setToken: (value) ->
    @setItem 'accessToken', value

  removeToken: ->
    @removeItem 'accessToken'

  clear: ->
    localStorage.clear()
