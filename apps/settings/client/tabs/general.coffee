{ USER, CUSTOMER } = require('sharify').data
User = require '../../../../models/user.coffee'
formCard = require '../../components/form_card/index.coffee'
avatarUploader = require '../../components/avatar_uploader/index.coffee'
homePathField = require '../../components/home_path_field/index.coffee'

module.exports = ($el) ->
  return unless $el.length

  models = user: new User(USER)

  $el.find('form').each (_i, form) -> formCard $(form)

  avatarUploader $el.find('.js-avatar-uploader')
  homePathField $el.find('.js-home-path-field'), models
