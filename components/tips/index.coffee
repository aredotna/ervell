{ TIPS } = require('sharify').data
Backbone = require 'backbone'

TipView = require './view.coffee'
mediator = require '../../lib/mediator.coffee'

module.exports = ->
  { shared: { current_user } } = mediator

  tips = new Backbone.Collection TIPS

  tips.each (tip) ->
    new TipView
      el: $(".js-tip[data-id='#{tip.id}']")
      model: tip
      collection: tips
      user: current_user

  tips.on 'remove', ->
    return if tips.length
    $('.js-tips').remove()
