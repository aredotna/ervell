module.exports = ($iframe) ->
  src = $iframe.attr 'src'
  $iframe.attr 'src', src.split('?').shift()
  $iframe
