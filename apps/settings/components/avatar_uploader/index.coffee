{ USER, POLICY } = require('sharify').data
User = require '../../../../models/user.coffee'
AvatarUploaderView = require './view.coffee'

module.exports = ($el) ->
  user = new User USER
  user.related().policy.set POLICY

  view = new AvatarUploaderView
    el: $el
    model: user

  view.render()
  view
