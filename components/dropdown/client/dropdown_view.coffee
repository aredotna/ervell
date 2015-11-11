_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'

module.exports = class DropdownView extends Backbone.View
  interval: 200

  desktopEvents:
    'mouseover' : 'onMouseOver'
    'mouseout' : 'onMouseOut'

  mobileEvents:
    'tap .js-dropdown-trigger' : 'toggleDropdown'

  initialize: ->
    mediator.on 'search:loaded', @closeDropdown, @
    mediator.on 'body:click', @onBodyClick, @

    @setEvents()

  setEvents: ->
    if $('body').hasClass 'is-mobile'
      @undelegateEvents()
      @delegateEvents(@mobileEvents)
    else
      @undelegateEvents()
      @delegateEvents(@desktopEvents)

  openDropdown: =>
    @$el.addClass 'dropdown--is_active'

  closeDropdown: (e) =>
    @$el.removeClass 'dropdown--is_active' unless @$el.is(':hover')

  toggleDropdown: =>
    @$el.toggleClass 'dropdown--is_active'

  onMouseOver: =>
    $('.dropdown--is_active').removeClass 'dropdown--is_active'
    @openDropdown()
    @$('input').focus()
    clearTimeout @timeoutId

  onMouseOut: (e) =>
    @timeoutId = setTimeout @closeDropdown, @interval

  onBodyClick: (e) =>
    if !e or
      (
        !@$el.is(e.target) and
        @$el.has(e.target).length is 0 and
        !$(e.target).hasClass 'trigger-mediator'
      )
        @closeDropdown() if @$el
