Backbone = require 'backbone'
cookies = require 'cookies-js'
{ keys, each } = require 'underscore'

module.exports = class State extends Backbone.Model
  defaults:
    view_mode: 'grid'

  initialize: ->
    # set values from cookies
    each keys(@defaults), (key) =>
      @set(key, val) if val = cookies.get key

    @on 'change:view_mode', @setCookie

  setCookie: (model, value)->
    cookies.set keys(model.changed)[0], value