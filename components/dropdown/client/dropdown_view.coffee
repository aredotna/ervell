_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'

module.exports = class DropdownView extends Backbone.View

  events:
    'tap .js-dropdown-trigger' : 'toggleDropdown'

