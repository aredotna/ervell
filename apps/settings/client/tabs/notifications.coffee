formCard = require '../../components/form_card/index.coffee'

module.exports = ($el) ->
  $el.find('form').each (_i, form) ->
    formCard $(form)
