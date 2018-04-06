{ USER } = require("sharify").data
User = require '../../../models/user.coffee'
initTips = require '../../../components/tips/index.coffee'
PathView = require '../../../components/path/client/path_view.coffee'
setupChannelsView = require '../components/channels/index.coffee'
MetaEditableAttributeView = require '../../../components/editable_attribute/client/meta_editable_attribute_view.coffee'

module.exports.init = ->
  user = new User USER

  initTips()

  new PathView
    el: $('section.path--header')
    model: user

  new MetaEditableAttributeView
    model: user
    el: $('.js-profile-description')
    _attribute: 'description'
    _kind: 'markdown'
    wait: true

  setupChannelsView()