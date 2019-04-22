$ ->
  $('span[data-client]:not([data-disabled])').on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()
    url = $(e.currentTarget).attr('href')
    window.open url, '_blank'