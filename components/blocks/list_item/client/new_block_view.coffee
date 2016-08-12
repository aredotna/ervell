Backbone = require "backbone"
sd = require("sharify").data
Blocks = require '../../../../collections/blocks.coffee'
Block = require '../../../../models/block.coffee'
Channel = require '../../../../models/channel.coffee'
analytics = require '../../../../lib/analytics.coffee'

newBlockTemplate = -> require('../templates/types/new_block.jade') arguments...

module.exports = class NewBlockView extends Backbone.View

  events:
    'tap .block-collection--list__column--new-field__placeholder .pointer' : 'triggerFileDialog'
    'tap .block-collection--list__column--new-field__mobile-placeholder .pointer' : 'triggerFileDialog'
    'tap .block-collection--list__column--new-field__textarea' : 'setActive'
    'blur .block-collection--list__column--new-field__textarea'  : 'removeActive'
    'tap .block-collection--list__column--new-button' : 'createBlock'
    'tap .block-collection--list__column--new-field__placeholder'  : 'setActive'
    'tap .block-collection--list__column--new-field__mobile-placeholder' : 'setActive'
    'keydown .block-collection--list__column--new-field__textarea' : 'onKeyUp'

  initialize: ({ @blocks, @$container, @autoRender })->
    @render() if @autoRender
    @setElCaches() unless @autoRender

  setActive: (e) ->
    console.log 'setActive'
    $target = $(e.currentTarget)
    return false if $target.hasClass '.pointer'
    @$el.addClass 'active'
    @$field.focus()

  removeActive: ->
    @$el.removeClass 'active' unless @$field.val()

  triggerFileDialog: (e)->
    console.log 'triggerFileDialog'
    e.preventDefault()
    e.stopImmediatePropagation()
    $('#fileupload input:file').trigger('click')
    return false

  isURL: ->
    string = @$field.val()
    urlregex = /^((ht{1}tp(s)?:\/\/)[-a-zA-Z0-9@:,!$%_\+.~#?&\(\)\/\/=]+)$/
    urlregex.test(string)

  fieldIsntEmpty: ->
    @$field.val() isnt ""

  onKeyUp: (e)->
    if e.keyCode is 13 and e.shiftKey
      @createBlock()
      return false

  createBlock: =>
    if @fieldIsntEmpty()
      block = new Block

      if @isURL()
        block.set source: @$field.val(), { silent: true }
      else
        block.set content: @$field.val(), { silent: true }

      @blocks.create block.toJSON(),
        url: "#{sd.API_URL}/channels/#{@model.get('slug')}/blocks"
        wait: true
        success: (block) =>
          analytics.track.click "New #{block.get('class')} block created"
          @$field.val ""

  render: ->
    @$container.prepend newBlockTemplate(channel: @model)
    @$el = $ '.block-item--new'
    @delegateEvents()

    @setElCaches()

  setElCaches: ->
    @$field = @$('.block-collection--list__column--new-field__textarea')