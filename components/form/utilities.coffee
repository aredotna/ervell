_ = require 'underscore'
{ isTouch } = require '../util/device.coffee'

module.exports =
  firstVisibleInput: ($el) ->
    $el.find('input:visible, textarea:visible').first()

  moveCursorToEnd: ($input) ->
    val = $input.val()
    $input.val('').val val

  isFocusable: ($el) ->
    $el.is('input') or $el.is('textarea')

  autofocus: ($el, defer = false) ->
    return if isTouch()

    focus = =>
      if not @isFocusable $el
        $el = @firstVisibleInput $el

      $el.focus()
      @moveCursorToEnd $el

    if defer then _.defer(focus) else focus()
