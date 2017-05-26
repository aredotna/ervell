mediator = require '../../../../lib/mediator.coffee'
NotificationsView = require './view.coffee'

module.exports = ($el) ->
  { notifications } = mediator.shared

  notifications.fetch()

  view = new NotificationsView
    el: $el
    collection: notifications

  view.render()
  view
