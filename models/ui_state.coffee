Backbone = require 'backbone'
cookies = require 'cookies-js'
{ keys, each } = require 'underscore'

module.exports = class UIState extends Backbone.Model
  defaults:
    view_mode: 'grid'
    lightbox: false
    sort: 'updated_at'
    filter: 'all'

  initialize: ->
    # set values from cookies
    each keys(@defaults), (key) =>
      @set(key, val) if val = cookies.get key

    @on 'change:view_mode', @setCookie
    @on 'change:sort', @setCookie
    @on 'change:filter', @setCookie

  setCookie: (model, value)->
    cookies.set keys(model.changed)[0], value