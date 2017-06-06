Backbone = require 'backbone'
{ isURL } = require 'validator'
{ isTouch } = require '../../util/device.coffee'
template = -> require('../index.jade') arguments...

module.exports = class AddBlockView extends Backbone.View
  className: 'AddBlock'

  events:
    'input': 'onInput'
    'click': 'focus'
    'keypress': 'onKeypress'
    'click .js-choose': 'choose'
    'click .js-button': 'save'

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
    val = @dom.input.val().trim()

    return if val is ''

    @dom.button.text 'Adding'

    attrs = if isURL val
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
        @checkInput()
        setTimeout (=> @dom.button.text 'Add Block'), 2000

      error: (_m, e) =>
        console.error e
        @dom.button.text 'Error'
        setTimeout (=> @dom.button.text 'Add Block'), 2000

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
