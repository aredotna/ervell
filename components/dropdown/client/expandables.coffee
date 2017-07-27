Cookies = require 'cookies-js'

name = 'DropdownSection--expandable'

keyify = ($el) ->
  [name, $el.data('key')].join ':'

init = ($el) ->
  unless $el.attr('data-key')?
    throw new Error 'requires `data-key`'

  currentState =
    # Grab the cookied state...
    Cookies.get(keyify $el) or

    # Or if the element is set to active by default
    if $el.data('state') is 'active'
      'active'

    # Fall back to inactive
    else
      'inactive'

  $el.attr 'data-state', currentState

  $links = $el.find 'a'

  $links.first().on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()

    previousState = $el.attr 'data-state'
    currentState = if previousState is 'active'
      'inactive'
    else
      'active'

    $el.attr 'data-state', currentState

    Cookies.set keyify($el), currentState

module.exports = ($el) ->
  $expandables = $el.find('.js-expandable')
  $expandables.each ->
    init $(this)
