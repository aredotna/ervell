module.exports = ($outer, $inner, { offset = 0 }) ->
  origin = $inner.css 'transform'

  speed = 1
  stop = false

  start: ->
    stop = false
    amount = $inner[0].scrollWidth - $outer.children().width() # Children for inner padding

    return unless amount > 0

    left = 0
    limit = -(amount + offset)

    tick = ->
      return if stop
      return if left < limit

      $inner.css 'transform', "translateX(#{left -= speed}px)"
      requestAnimationFrame(tick) if left > limit

    tick()

  end: ->
    stop = true
    $inner.css 'transform', origin
