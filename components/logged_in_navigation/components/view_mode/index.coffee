mediator = require '../../../../lib/mediator.coffee'

glyphs =
  grid: 'grid-three-up'
  list: 'list'

module.exports = ($el) ->
  { state } = mediator.shared

  $indicator = $el.find('.js-indicator')
  $toggle = $el.find('.js-toggle')

  $toggle.on 'click', (e) ->
    $target = $(e.currentTarget)

    state.set 'view_mode', mode = $target.data 'mode'
    $indicator.attr 'data-glyph', glyphs[mode]

    window.location.reload()
