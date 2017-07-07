module.exports = ($el) ->
  $el.find '.js-log-out'
    .on 'click', ->
      localStorage.clear()

  null
