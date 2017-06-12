formCard = require '../../components/form_card/index.coffee'
avatarUploader = require '../../components/avatar_uploader/index.coffee'

module.exports = ($el) ->
  return unless $el.length

  avatarUploader $el.find('.js-avatar-uploader')

  $el.find('form').each (_i, form) ->
    formCard $(form)
