formCard = require '../../components/form_card/index.coffee'

module.exports = ->
  $('.js-settings')
    .find('form')
      .each (_i, form) ->
        formCard $(form)
