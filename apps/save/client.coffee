Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
ConnectView = require '../../components/connect/client/connect_view.coffee'

module.exports.init = ->
  new ConnectView
    el: $('#save--connect')
    block: new Backbone.Model

