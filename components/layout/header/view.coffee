_ = require 'underscore'
Backbone = require 'backbone'
SearchBarView = require '../../search_bar/client/view.coffee'
AuthModalView = require '../../auth_modal/view.coffee'
SettingsView = require '../../settings/client/view.coffee'
mediator = require '../../../lib/mediator.coffee'
Notifications = require "../../../collections/notifications.coffee"
SmallFeedView = require '../../feed/client/small_feed_view.coffee'
NewChannelView = require '../../new_channel/client/new_channel_view.coffee'
sd = require('sharify').data

module.exports = class HeaderView extends Backbone.View

  events:
    'tap #layout-header__search__input'   : 'setActive'
    'blur #layout-header__search__input'  : 'unsetActive'
    'tap .header--icon'                   : 'setActive'
    'tap .btn-login'                      : 'login'
    'tap .btn-signup'                     : 'signup'

  initialize: (options) ->
    mediator.on 'open:auth', @openAuth, @
    mediator.on 'body:click', @closeDropdown, @
    mediator.on 'search:loaded', @closeDropdown, @
    mediator.on 'new:channel', @openChannelToggle, @
    mediator.shared.state.on 'change', @toggle, @

    @postRender()

  toggle: ->
    if mediator.shared.state.get('isDraggingBlocks')
      @$el.hide()
    else
      @$el.show()

  setActive: (e)->
    unless $('body').hasClass('is-mobile')
      @$el.addClass 'is-active'
      @$('#layout-header__search__input').focus()

  unsetActive: (e)->
    @$el.removeClass 'is-active'

  openChannelToggle: ->
    @$('.new-channel-dropdown').addClass 'dropdown--is_active'

  closeDropdown: (e)->
    if !e or (!@$el.is(e.target) and @$el.has(e.target).length is 0 and !$(e.target).hasClass 'trigger-mediator')
      $('.dropdown--is_active').removeClass 'dropdown--is_active'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'login'

  openAuth: (options) ->
    @modal = new AuthModalView _.extend({ width: '500px' }, options)

  render: =>
    @$el.html template
      user: mediator.shared.current_user

    @postRender()

  postRender: ->
    @searchBarView = new SearchBarView
      el: @$('.layout-header__search')
      $input: @$('#layout-header__search__input')
      $results: @$('.layout-header__search__results')

    if $('.path__inner')[0] and !$('body').hasClass('is-mobile')
      new Waypoint.Sticky
        element: $('.path__inner')
        offset: 3

