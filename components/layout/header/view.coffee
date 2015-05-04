_ = require 'underscore'
Backbone = require 'backbone'
SearchBarView = require '../../search_bar/client/view.coffee'
AuthModalView = require '../../auth_modal/view.coffee'
SettingsView = require '../../settings/client/view.coffee'
AuthRouter = require './auth_router.coffee'
mediator = require '../../../lib/mediator.coffee'
Notifications = require "../../../collections/notifications.coffee"
SmallFeedView = require '../../feed/client/small_feed_view.coffee'
NewChannelView = require '../../new_channel/client/new_channel_view.coffee'
sd = require('sharify').data

template = -> require('./templates/index.jade') arguments...

module.exports = class HeaderView extends Backbone.View

  events:
    'tap #layout-header__search__input'   : 'setActive'
    'blur #layout-header__search__input'  : 'unsetActive'
    'tap .header--icon'                   : 'setActive'
    'tap .btn-login'                      : 'login'
    'tap .btn-signup'                     : 'signup'
    'tap .dropdown--menu__trigger'        : 'toggleDropdown'
    'tap .dropdown__link--settings'       : 'openSettings'

  initialize: (options) ->

    @searchBarView = new SearchBarView
      el: @$('.layout-header__search')
      $input: @$('#layout-header__search__input')
      $results: @$('.layout-header__search__results')

    mediator.on 'open:auth', @openAuth, @
    mediator.on 'body:click', @closeDropdown, @
    mediator.on 'search:loaded', @closeDropdown, @
    mediator.on 'notifications:synced', @maybeSetNotifications, @
    mediator.on 'notifications:cleared', @unsetNotifications, @
    mediator.shared.state.on 'change', @toggle, @
    @listenTo mediator.shared.current_user, 'change', @render

    if $('.path__inner')[0] and !$('body').hasClass('is-mobile')
      new Waypoint.Sticky
        element: $('.path__inner')
        offset: 3

    if !sd.CURRENT_USER
      new AuthRouter pushState: false
    else
      @notifications = new Notifications()
      mediator.shared.notifications = @notifications
      @notifications.fetch()
      @notifications.on 'sync', -> mediator.trigger 'notifications:synced', @

      new NewChannelView
        el: @$('.new-channel-dropdown__container')

  toggle: ->
    if mediator.shared.state.get('isDraggingBlocks')
      @$el.hide()
    else
      @$el.show()

  setActive: (e)->
    @$el.addClass 'is-active'
    @$('#layout-header__search__input').focus()

  unsetActive: (e)-> @$el.removeClass 'is-active'

  clearNotifications: (e)->
    @notifications.markRead()
    @$('.user-avatar').removeClass 'has-notifications'

  maybeSetNotifications: ->
    if (count = @notifications.getNumberUnread()) > 0
      @$('.user-avatar, .dropdown__link--notifications').addClass 'has-notifications'
      @$('.notifications--count').text count

  unsetNotifications: ->
    @$('.user-avatar, .dropdown__link--notifications').removeClass 'has-notifications'
    @$('.notifications--count').text ""

  toggleDropdown: (e)->
    $el = $(e.currentTarget).parent()
    if !@$('.dropdown--is_active').is($el)
      @$('.dropdown--is_active').removeClass 'dropdown--is_active'

    ac = $el.toggleClass('dropdown--is_active')

    if $el.hasClass 'dropdown--is_active'
      $el.find('input').focus()

    if $(window).width() < 410
      $('.container').toggleClass 'transparent'

  closeDropdown: (e)->
    if !e or (!@$el.is(e.target) and @$el.has(e.target).length is 0)
      $('.dropdown--is_active').removeClass 'dropdown--is_active'

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'login'

  openAuth: (options) ->
    @modal = new AuthModalView _.extend({ width: '500px' }, options)

  openSettings: (options) ->
    @modal = new SettingsView

  render: =>
    @$el.html template
      user: mediator.shared.current_user

