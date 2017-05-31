module.exports = ($el) ->
  $hovers = $el.find('.js-dropdown-hover')

  deactivate = -> # Overwritten by activations

  $hovers.on 'click', (e) ->
    e.preventDefault()

    deactivate()

    document.documentElement.classList.add 'HTML--disabled-scrolling'

    $target = $(this)

    $dropdown = $target.find('.js-dropdown')
    $dropdown.attr 'data-active', true

    $surface = $('<div class="DropdownTapSurface"></div>')

    deactivate = ->
      $dropdown.removeAttr 'data-active'

      document.documentElement.classList.remove 'HTML--disabled-scrolling'

      $surface.remove()

      # Simulate mouseleave incase anything has bound to it
      $target.trigger 'mouseleave'

    $surface.on 'click', (e) ->
      e.stopPropagation()
      deactivate()

    $target.append $surface
