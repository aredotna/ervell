$ ->
  $('span[data-client]:not([data-disabled])').on 'click', (e) ->
    url = $(e.currentTarget).attr('href')
    window.open url, '_blank'