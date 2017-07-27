init = ($el) ->
  $el.on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()

    state = $el.attr 'data-state'

    $el.attr 'data-state', if state is 'active'
      'inactive'
    else
      'active'

module.exports = ($el) ->
  $expandables = $el.find('.js-expandable')
  $expandables.each ->
    init $(this)
