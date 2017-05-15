formCard = require '../../components/form_card/index.coffee'

module.exports = ($el) ->
  return unless $el.length

  $el.find('form').each (_i, form) ->
    formCard $(form)
