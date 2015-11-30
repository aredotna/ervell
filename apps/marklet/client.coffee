Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
SaveConnectView = require './client/save_connect_view.coffee'

module.exports.init = ->
  new SaveConnectView
    el: $('#save--connect')
    block: new Backbone.Model

  $('.tab--container__nav__item').click (e) ->
    e.preventDefault()

    $('.tab--container__nav__item.is-active, .tab-content.is-active').removeClass 'is-active'
    tab = $(e.currentTarget).data 'tab'
    $(e.currentTarget).addClass 'is-active'
    $("#tab-#{tab}").addClass 'is-active'

