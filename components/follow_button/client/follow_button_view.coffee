_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

module.exports = class FollowButtonView extends Backbone.View

  initialize: (options) ->
    super

    console.log 'init FollowButtonView'

