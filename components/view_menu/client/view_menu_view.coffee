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
    'tap .view-menu__dropdown__option' : 'setMode'

  initialize: ->
    @desktopEvents = _.extend @desktopEvents, @events
    @mobileEvents = _.extend @mobileEvents, @events

    super

    @$el.on 'click', @toggleView

  toggleView: (e) ->
    return if $(e.currentTarget).hasClass 'view-menu__dropdown__option'
    mode = if @model.get('view_mode') is 'list' then 'grid' else 'list'
    model.set view_mode: setMode
    glyph = @glyphs[mode]
    @$el.removeClass 'dropdown--is_active'
    @$('.view-menu__selected').attr 'data-glyph', glyph
    window.location.reload()

  setMode: (e) ->
    mode = $(e.currentTarget).data 'mode'
    glyph = $(e.currentTarget).data 'glyph'
    @model.set 'view_mode', mode
    @$('.view-menu__selected').attr 'data-glyph', glyph
    @$el.removeClass 'dropdown--is_active'
    window.location.reload()