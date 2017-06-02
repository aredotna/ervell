module.exports = ($outer, $inner, { offset = 40 }) ->
  origin = $inner.css 'transform'

  start: ->
    if (amount = $inner[0].scrollWidth - $outer.width()) > 0
      $inner.css 'transform', "translateX(-#{amount + offset}px)"

  end: ->
    $inner.css 'transform', origin
