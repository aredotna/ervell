_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
FollowButtonView = require '../../follow_button/client/follow_button_view.coffee'

module.exports = class PathView extends Backbone.View

  initialize: (options) ->
    super

    console.log 'init PathView'

    new FollowButtonView el: @$('.follow_button')