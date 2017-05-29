{ PROFILE_CHANNELS, USER } = require("sharify").data
User = require '../../../models/user.coffee'
PathView = require '../../../components/path/client/path_view.coffee'
ProfileView = require '../components/channels/view.coffee'
MetaEditableAttributeView = require '../../../components/editable_attribute/client/meta_editable_attribute_view.coffee'

module.exports.init = ->
  user = new User USER

  view = new ProfileView
    el: $('.js-user-channels')

  view.setUpChannelGroupViews(PROFILE_CHANNELS)

  new PathView
    el: $('section.path--header')
    model: user

  new MetaEditableAttributeView
    model: user
    el: $("#metadata--about .metadata__content")
    _attribute: 'description'
    _kind: 'markdown'
    wait: true