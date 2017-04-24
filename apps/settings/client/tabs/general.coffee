formCard = require '../../components/form_card/index.coffee'
avatarUploader = require '../../components/avatar_uploader/index.coffee'

module.exports = ->
  avatarUploader $('.js-avatar-uploader')

  $('.js-settings')
    .find('form')
      .each (_i, form) ->
        formCard $(form)
