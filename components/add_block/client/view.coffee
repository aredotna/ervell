Backbone = require 'backbone'
{ isURL, isDataURI } = require 'validator'
{ isTouch } = require '../../util/device.coffee'
mediator = require '../../../lib/mediator.coffee'
template = -> require('../index.jade') arguments...

module.exports = class AddBlockView extends Backbone.View
  className: 'AddBlock'

  events:
    'input': 'onInput'
    'click': 'focus'
    'keypress': 'onKeypress'
    'click .js-choose': 'choose'
    'click .js-button': 'save'

  initialize: ->
    @saving = false

    # By re-syncing the account it ensures we keep other parts of
    # the UI-state in sync (permissions)
    @listenTo @collection, 'add', -> mediator.shared.current_user.fetch()

  onInput: (e) ->
    @checkInput()

  onKeypress: (e) ->
    if e.keyCode is 13 and e.shiftKey
      # <shift> + <enter>: pass through line break
      return

    if e.keyCode is 13 and not e.shiftKey
      # <enter>: trigger save
      e.preventDefault()
      @save()

  focus: (e) ->
    if isTouch() and not @touched and not @$el.hasClass("#{@className}--list")
      # If we're on a touch device and not in list mode
      # (which displays the hover tip by default),
      # ignore the first tap so that we display the hover content
      @touched = yes

    else if isTouch()
      # Second tap focuses the input and resets the touched state
      @dom.input.focus()
      @touched = no

    else
      @dom.input.focus()

  checkInput: ->
    if (@dom.input.val()?.trim()) isnt ''
      @$el.addClass "#{@className}--typing"
      @dom.button.removeAttr 'disabled'
    else
      @$el.removeClass "#{@className}--typing"
      @dom.button.attr 'disabled', true

  choose: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    $('#fileupload input:file').trigger 'click'

    false

  save: ->
    return if @saving

    val = @dom.input.val().trim()

    return if val is ''

    @saving = true
    @dom.button.text 'Adding'
    @dom.button.attr 'disabled', true

    attrs = if (isURL(val) or isDataURI(val))
      source: val
    else
      content: val

    @collection.create attrs,
      url: @collection.url
      wait: true

      success: =>
        @dom.button.text 'Added'
        @dom.input.val ''
        @dom.input.focus()
        @dom.button.attr 'disabled', false
        @saving = false
        @checkInput()
        setTimeout (=> @dom.button.text 'Add block'), 2000

      error: (_m, e) =>
        console.error e
        @saving = false
        @dom.button.text 'Error'
        @dom.button.attr 'disabled', false
        setTimeout (=> @dom.button.text 'Add block'), 2000

  postRender: ->
    @dom =
      input: @$('.js-input')
      button: @$('.js-button')

    @checkInput()

    @$el.addClass "#{@className}--initialized"

  render: ->
    @$el.html template()

    @postRender()

    this
