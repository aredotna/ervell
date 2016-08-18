_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
DropdownView = require '../../dropdown/client/dropdown_view.coffee'

template = -> require('../templates/index.jade') arguments...

module.exports = class UserMenuView extends DropdownView
  glyphs:
    grid: 'grid-three-up'
    list: 'list'

  events:
    'tap .view-menu__dropdown__option' : 'switchMode'
    'tap .js-dropdown-trigger' : 'toggleView'

  initialize: ->
    @desktopEvents = _.extend @desktopEvents, @events
    @mobileEvents = _.extend @mobileEvents, @events

    super

  toggleView: (e) =>
    mode = if @model.get('view_mode') is 'list' then 'grid' else 'list'
    @_setMode mode

  switchMode: (e) ->
    console.log 'switchMode', $(e.currentTarget).data 'mode'
    @_setMode $(e.currentTarget).data 'mode'

  _setMode: (mode)->
    console.log '_setMode', mode
    return unless mode is 'list' or mode is 'grid'
    console.log 'should set mode'
    @model.set view_mode: mode
    @$el.removeClass 'dropdown--is_active'
    @$('.view-menu__selected').attr 'data-glyph', @glyphs[mode]
    window.location.reload()