Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
SaveConnectView = require './client/save_connect_view.coffee'

module.exports.init = ->
  new SaveConnectView
    el: $('#save--connect')
    block: new Backbone.Model

