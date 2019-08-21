{ USER, CUSTOMER } = require('sharify').data
Promise = require 'bluebird-q'
User = require '../../../../models/user.coffee'
formCard = require '../../components/form_card/index.coffee'
avatarUploader = require '../../components/avatar_uploader/index.coffee'

{ mountWithApolloProvider } = require '../../../../v2/apollo/index'
{ default: CustomBadgeUploader } = require '../../../../v2/components/CustomBadgeUploader/index.js'
{ default: UserSettings } = require '../../../../v2/components/UserSettings/index.tsx'

module.exports = ($el) ->
  return unless $el.length

  avatarUploader $el.find('.js-avatar-uploader')

  mountWithApolloProvider CustomBadgeUploader, { }, $('.js-custom-badge-uploader')
  mountWithApolloProvider UserSettings, { }, $('.js-user-settings')
