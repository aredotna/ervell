sd = require('sharify').data
Backbone = require 'backbone'
markdown = require 'marked'
Block = require '../../../models/block.coffee'
Comments = require '../../../collections/comments.coffee'

template =-> require('../templates/_block.jade') arguments...

module.exports.FullBlockView = class FullBlockView extends Backbone.View

  events:
    'click .tab--container__nav__item' : 'toggleTab'

  toggleTabs: (e)->
    e.preventDefault()

    $('.tab--container__nav__item.is-active, .tab-content.is-active').removeClass 'is-active'
    tab = $(e.currentTarget).data 'tab'
    $(e.currentTarget).addClass 'is-active'
    $("#tab-#{tab}").addClass 'is-active'

  render: ->
    @$el.html template block: @model

    @postRender()

    this

  postRender: ->
    # nothing for now

module.exports.init = ->
  block = new Block sd.BLOCK

  new FullBlockView
    model: block
    el: $(".container")
