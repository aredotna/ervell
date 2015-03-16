_ = require 'underscore'
Backbone = require 'backbone'
{ parse } = require 'url'
Cookies = require 'cookies-js'
ModalView = require '../modal/view.coffee'
Form = require '../mixins/form.coffee'
mediator = require '../../lib/mediator.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'

{ templateMap } = require './maps.coffee'

class State extends Backbone.Model
  defaults: mode: 'register'

module.exports = class AuthModalView extends ModalView
  _.extend @prototype, Form

  className: 'auth'

  template: ->
    templateMap[@state.get 'mode'] arguments...

  events: -> _.extend super,
    'click .auth-toggle' : 'toggleMode'
    'submit form'        : 'submit'
    'click #auth-submit' : 'submit'

  initialize: (options) ->
    { @destination } = options
    @redirectTo = options.redirectTo if options.redirectTo
    @preInitialize options
    super

  preInitialize: (options = {}) ->
    { @copy } = options
    @user = new LoggedOutUser
    mode = mode: options.mode if options.mode
    @state = new State mode

    @templateData =
      pathname: location.pathname
      redirectTo: @redirectTo
      mode: @state.get('mode')

    @listenTo @state, 'change:mode', @reRender
    @listenTo @state, 'change:mode', @logState

    mediator.on 'auth:change:mode', @setMode, this
    mediator.on 'auth:error', @showError
    mediator.on 'modal:closed', @logClose

  setMode: (mode) ->
    @state.set 'mode', mode

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')
    @templateData.mode = state.get('mode')

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set (data = @serializeForm())

    @user[@state.get 'mode']
      success: @onSubmitSuccess
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        @showError response

  onSubmitSuccess: (model, response, options) =>
    @$('button').attr 'data-state', 'success'

    if response.error?
      @showError _s.capitalize response.error
    else
      Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination

      switch @state.get('mode')
        when 'login'
          Cookies.set('signed_in', true, expires: 60 * 60 * 24 * 7)
          if @redirectTo
            location.href = @redirectTo
          else
            location.reload()
        when 'register'
          mediator.trigger 'auth:sign_up:success'
          location.href = @redirectTo or '/personalize'
        when 'forgot'
          mediator.trigger 'auth:change:mode', 'reset'

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

  remove: ->
    mediator.off 'auth:change:mode'
    mediator.off 'auth:error'
    mediator.off 'modal:closed'
    super