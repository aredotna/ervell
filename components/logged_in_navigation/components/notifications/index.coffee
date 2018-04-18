Promise = require 'bluebird-q'
Backbonbe = require 'backbone'
{ API_URL, CURRENT_USER } = require('sharify').data
mediator = require '../../../../lib/mediator.coffee'
NotificationsView = require './view.coffee'

module.exports = ($el) ->
  { notifications } = mediator.shared

  count = new Backbone.Model(unread_count: 0)

  Promise($.ajax({
    type: 'GET'
    url: "#{API_URL}/notifications/unread_count"
    headers: {
      'X-AUTH-TOKEN': CURRENT_USER.authentication_token
    }
  })).then ({ unread_count }) =>
    count.set('unread_count', unread_count)

  view = new NotificationsView
    el: $el
    count: count
    collection: notifications

  view.render()
  view
