module.exports = ($el) ->
  $input = $el.find 'input'
  $channels = $el.find 'a'

  $input
    .on 'input', (e) ->
      e.preventDefault()

      $el.attr 'data-state', if $input.val() isnt '' then 'active' else 'inactive'

      console.log $input.val()

  $channels
    .on 'click', (e) ->
      e.preventDefault()

      $(this).attr 'data-selected'

      selected = $(this).attr('data-selected') is 'true'
      toggled = not selected

      $(this).attr 'data-selected', toggled
