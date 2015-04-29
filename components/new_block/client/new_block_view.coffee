Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Blocks = require '../../../collections/blocks.coffee'
Block = require '../../../models/block.coffee'
Channel = require '../../../models/channel.coffee'
analytics = require '../../../lib/analytics.coffee'

newBlockTemplate = -> require('../templates/new_block.jade') arguments...

module.exports = class NewBlockView extends Backbone.View

  events:
    'click .add-block__placeholder__choose'                 : 'triggerFileDialog'
    'click #grid__block--new-block__content-field'          : 'setActive'
    'blur  textarea#grid__block--new-block__content-field'  : 'removeActive'
    'click .grid__block--new-block__cancel'                 : 'cancelForm'
    'click .grid__block--new-block__submit'                 : 'createBlock'
    'click .add-block__placeholder'                         : 'setActive'

  initialize: (options)->
    @blocks = options.blocks
    @$container = options.container

    @render() if options.autoRender
    @setElCaches() unless options.autoRender

  setActive: (e) ->
    $target = $(e.currentTarget)
    return false if $target.hasClass '.add-block__placeholder__choose'
    @$el.addClass 'active'
    @$('#grid__block--new-block__content-field').focus()

  removeActive: ->
    @$el.removeClass 'active' unless @$field.val()

  triggerFileDialog: ->
    $('#fileupload input:file').trigger('click')
    return false

  cancelForm: (e)->
    $parent = $(e.target).closest('.grid__block--new-block__form')
    @$el.removeClass 'active'
    $parent.removeClass 'active'

  isURL: ->
    string = @$field.val()
    urlregex = /^((ht{1}tp(s)?:\/\/)[-a-zA-Z0-9@:,!$%_\+.~#?&\(\)\/\/=]+)$/
    urlregex.test(string)

  fieldIsntEmpty: ->
    @$field.val() isnt ""

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
          @$field.blur()

  setElCaches: ->
    @$field = @$('.grid__block--new-block__content-field')

  render: ->
    @$container.prepend newBlockTemplate(channel: @model)
    @$el = $ '.grid__block--new-block'
    @delegateEvents()

    @setElCaches()
