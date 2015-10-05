Backbone = require 'backbone'
Backbone.$ = $
sd = require('sharify').data
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'
SearchBlocks = require '../../../collections/search_blocks.coffee'
getCaretCoordinates = require '../../../lib/vendor/textarea-caret-position'

template = -> require('../templates/mention_quicksearch.jade') arguments...

module.exports = class MentionQuicksearchView extends Backbone.View

  attributes:
    class: 'mention-quicksearch'

  events:
    'mousedown .mention-quicksearch__user': 'onClickUser'

  initialize: (options) =>
    @$input = $(options.input)
    @$container = $(options.container)
    @workingToken = {}
    @results = new SearchBlocks null,
      subject: 'users'
      per: 5

    @bindInputEvents()
    @render()

  onClickUser: (e) =>
    e.preventDefault()
    e.stopPropagation()

    @$el.hide()

    { start, end } = @workingToken
    text = @$input.val()
    slug = $(e.currentTarget).data('slug')
    newText = text.slice(0, start + 1) + slug + text.slice(end)
    caretPosition = start + 1 + slug.length

    @$input.val(newText)
    @$input[0].setSelectionRange(caretPosition, caretPosition)

  bindInputEvents: =>
    @$input.on('focus.mq', @onFocus)
    @$input.on('blur.mq', @onBlur)
    @$input.on('keyup.mq', @setState)
    @$input.on('click.mq', @setState)

  onFocus: =>
    @active = true
    @setState()
    @setVisibility()

  onBlur: (e)=>
    @active = false
    @setVisibility()

  setState: =>
    cursorStart = @$input[0].selectionStart
    cursorEnd = @$input[0].selectionEnd

    # try not to get in the way if user is selecting something
    return if (cursorStart != cursorEnd)

    cursorPosition = cursorStart
    commentText = @$input.val()
    tokens = commentText.split(/\s/)
    position = 0

    for token in tokens
      start = position
      end = position + token.length
      afterStart = cursorPosition >= position
      beforeEnd = cursorPosition <= position + token.length
      position = end + 1

      if afterStart && beforeEnd
        inputPosition = @$input.position()
        tokenPosition = getCaretCoordinates(@$input[0], start)
        tokenData =
          text: token,
          start: start,
          end: end
        positionData =
          top: inputPosition.top + tokenPosition.top
          left: inputPosition.left + tokenPosition.left
        return @setWorkingToken tokenData, positionData

  setWorkingToken: (tokenData, position) =>
    return if @workingToken.text == tokenData.text

    @workingToken = tokenData
    @searchRequest.abort() if @searchRequest

    if @workingToken.text[0] == '@'
      @searchRequest = @results.fetch
        data:
          q: @workingToken.text.slice(1, -1)
        success: @onLoadResults
      @$el.css
        top: position.top - @$input.scrollTop() - 10
        left: @clampHorizontalOffset(position.left)
    else
      @results.reset([])
      @setVisibility()

  clampHorizontalOffset: (offset)->
    if offset + 310 > $(window).width()
      $(window).width() - 310
    else
      offset

  onLoadResults: =>
    @setVisibility()
    @render()

  setVisibility: =>
    if @active && @results.length
      @$el.show()
    else
      @$el.hide()

  render: =>
    @$container.append(@$el) unless @$el.parent().length

    @$el.html template
      users: @results.toJSON()

  dispose: ->
    @$input.off('focus.mq blur.mq keyup.mq click.mq')
    @$input = null
    @$container = null
    @undelegateEvents()
    @remove()

