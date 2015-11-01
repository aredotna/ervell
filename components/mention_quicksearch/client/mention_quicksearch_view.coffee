_ = require 'underscore'
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
    @onSelectUser(e.currentTarget)

  bindInputEvents: =>
    @$input.on('focus.mq', @onFocus)
    @$input.on('blur.mq', @onBlur)
    @$input.on('keyup.mq', @onKeyUp)
    @$input.on('keydown.mq', @onKeyDown)
    @$input.on('click.mq', @extractWorkingToken)

  onFocus: =>
    @active = true
    @setVisibility()

  onBlur: (e)=>
    @active = true
    @setVisibility()

  onKeyDown: (e) =>
    if @isVisible() and e.keyCode in [13, 38, 40]
      @updateHighlight(e)

  onKeyUp: (e) =>
    # if quicksearch results are visible and the
    # user has just pressed up, down, or enter
    @extractWorkingToken(e)

  updateHighlight: (e)->
    highlightableSelector = '.mention-quicksearch__user'
    highlightedSelector = highlightableSelector + '.is-highlighted'
    highlighted = @$el.find(highlightedSelector)

    # dont interfere with enter keypress
    # when nothing is selected
    return if e.keyCode == 13 && !highlighted.length

    e.preventDefault()
    e.stopPropagation()

    # enter key
    if e.keyCode == 13
      return @onSelectUser(highlighted)
    # up arrow
    if e.keyCode == 38
      if !highlighted.length
        next = @$el.find(highlightableSelector + ':last')
      else
        next = highlighted.prev()
    # down arrow
    else if e.keyCode == 40
      if highlighted.length
        next = highlighted.next()
      else
        next = @$el.find(highlightableSelector + ':first')

    if next?.length
      highlighted.removeClass('is-highlighted')
      next.addClass('is-highlighted')

  onSelectUser: (userEl) =>
    slug = $(userEl).data('slug')
    { start, end } = @workingToken
    text = @$input.val()
    newText = text.slice(0, start + 1) + slug + text.slice(end)
    caretPosition = start + 2 + slug.length

    @$el.hide()
    @$input.val(newText + " ")
    @$input[0].setSelectionRange(caretPosition, caretPosition)

  extractWorkingToken: =>
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
    if @isVisible()
      @$el.show()
      _.defer => @$('.mention-quicksearch__user:first').addClass 'is-highlighted'
    else
      @$el.hide()

  isVisible: =>
    @active && @results.length

  render: =>
    @$container.append(@$el) unless @$el.parent().length

    @$el.html template
      users: @results.toJSON()

  dispose: ->
    @$input.off('focus.mq blur.mq keyup.mq click.mq keydown.mq')
    @$input = null
    @$container = null
    @undelegateEvents()
    @remove()

