_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
DropdownView = require '../../dropdown/client/dropdown_view.coffee'

template = -> require('../templates/index.jade') arguments...

module.exports = class UserMenuView extends DropdownView

  events:
    'tap .js-dropdown-trigger' : 'openProfile'

  initialize: ->
    @desktopEvents = _.extend @desktopEvents, @events
    super

  openProfile: ->
    window.location.href = mediator.shared.current_user.href()