Promise = require 'bluebird-q'
Backbone = require 'backbone'
{ API_URL, CURRENT_USER } = require('sharify').data
NotificationsBadgeView = require './view.coffee'

module.exports = ($el) ->
  state = new Backbone.Model({ unread_count: 0 })

  Promise($.ajax({
    type: 'GET',
    url: "#{API_URL}/notifications/unread_count",
    headers: {
      'X-AUTH-TOKEN': CURRENT_USER.authentication_token
    },
  })).then ({ unread_count }) =>
    state.set('unread_count', unread_count)

  view = new NotificationsBadgeView
    el: $el
    state: state

  view.render()
  view
