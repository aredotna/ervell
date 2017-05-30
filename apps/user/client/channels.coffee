{ USER } = require("sharify").data
User = require '../../../models/user.coffee'
PathView = require '../../../components/path/client/path_view.coffee'
setupChannelsView = require '../components/channels/index.coffee'
MetaEditableAttributeView = require '../../../components/editable_attribute/client/meta_editable_attribute_view.coffee'

module.exports.init = ->
  user = new User USER

  new PathView
    el: $('section.path--header')
    model: user

  new MetaEditableAttributeView
    model: user
    el: $("#metadata--about .metadata__content")
    _attribute: 'description'
    _kind: 'markdown'
    wait: true

  setupChannelsView()