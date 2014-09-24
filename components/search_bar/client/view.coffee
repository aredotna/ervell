Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
SearchBlocks = require '../../../collections/search_blocks.coffee'

module.exports = class SearchBarView extends Backbone.View

  events:
    'keyup #layout-header__search__input': 'onKeyUp'

  initialize: (options)->
    @$input = options.$input
    console.log 'initialize', @$input

  onKeyUp: (e)->
    e.preventDefault()
    e.stopPropagation()

    $('body').stop()

    switch e.keyCode
      when 13
        console.log 'enter'
      when 40
        console.log 'down'
      when 38
        console.log 'up'
      else
        console.log 'search'