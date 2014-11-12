_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

module.exports = class PathView extends Backbone.View

  initialize: (options) ->
    super

    console.log 'init PathView'