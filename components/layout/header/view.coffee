_ = require 'underscore'
Backbone = require 'backbone'
SearchBarView = require '../../search_bar/client/view.coffee'
AuthModalView = require '../../auth_modal/view.coffee'
AuthRouter = require './auth_router.coffee'
mediator = require '../../../lib/mediator.coffee'
sd = require('sharify').data
Backbone.$ = $

module.exports = class HeaderView extends Backbone.View

  events:
    'click .btn-login'      : 'login'
    'click .btn-signup'     : 'signup'
    'click .dropdown--menu__trigger' : 'toggleDropdown'

  initialize: (options) ->
    { @$window, @$body } = options

    @searchBarView = new SearchBarView
      el: @$('.layout-header__search')
      $input: @$('#layout-header__search__input')
      $results: @$('.layout-header__search__results')

    mediator.on 'open:auth', @openAuth, @

    if !sd.CURRENT_USER
      new AuthRouter
      Backbone.history.start()

  toggleDropdown: (e)->
    $el = $(e.currentTarget).parent().parent()
    ac = $el.toggleClass('dropdown--is_active')

  openAuth: (options) ->
    @modal = new AuthModalView _.extend({ width: '500px' }, options)

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'login'
