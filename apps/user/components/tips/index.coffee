Backbone = require 'backbone'
TipView = require './view.coffee'
{ TIPS } = require('sharify').data

mediator = require '../../../../lib/mediator.coffee'

module.exports = ->
  tips = new Backbone.Collection TIPS

  tips.each (tip) ->
    new TipView
      el: $(".js-tip[data-id=#{tip.id}")
      model: tip

  tips.on 'update', ->
    unless tips.length
      mediator.shared.current_user.save show_tour: false
      $('.js-tips').remove()
