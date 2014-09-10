Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../../models/channel.coffee'

module.exports = class NewBlockView extends Backbone.View

  events:
    'click .grid__block--new-block__plus_button' : 'showAddBlockForm'
    'click .grid__block--new-block__cancel' : 'cancelForm'
    'click .grid__block--new-block__submit' : 'createBlock'

  initialize: ->
    console.log 'this NewBlockView', @, 'el', @$el

  showAddBlockForm: ->
    @$el.addClass 'active'
    @$('.grid__block--new-block__add-block').addClass 'active'

  cancelForm: (e)->
    $parent = $(e.target).closest('.grid__block--new-block__form')
    @$el.removeClass 'active'
    $parent.removeClass 'active'

  isURL: ->
    string = @$field.val()
    urlregex = /^((ht{1}tp(s)?:\/\/)[-a-zA-Z0-9@:,!$%_\+.~#?&\(\)\/\/=]+)$/
    urlregex.test(string)

  createBlock: ->