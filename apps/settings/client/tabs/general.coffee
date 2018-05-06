{ USER, CUSTOMER } = require('sharify').data
Promise = require 'bluebird-q'
User = require '../../../../models/user.coffee'
formCard = require '../../components/form_card/index.coffee'
avatarUploader = require '../../components/avatar_uploader/index.coffee'
homePathField = require '../../components/home_path_field/index.coffee'

module.exports = ($el) ->
  return unless $el.length

  models = user: new User(USER)

  onSubmit = ->
    currentMeta = models.user.get('metadata')
    currentMeta = {} if not currentMeta
    currentMeta.description = $el.find('.js-bio').val()

    $.post "#{models.user.urlRoot()}/metadata",
      metadata: currentMeta

  formCard $('form.js-upload')
  formCard $('form.js-settings'), onSubmit

  avatarUploader $el.find('.js-avatar-uploader')
  homePathField $el.find('.js-home-path-field'), models
