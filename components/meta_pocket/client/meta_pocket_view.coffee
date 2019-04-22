_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'

pocketTemplate = -> require('../templates/meta_pocket.jade') arguments...

module.exports = class MetaPocketView extends Backbone.View
  template: pocketTemplate
  $container: $('metadata--container')
  displayed: yes
  hasControls: no


