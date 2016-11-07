_ = require 'underscore'
Backbone = require 'backbone'
{ parse } = require 'url'
Cookies = require 'cookies-js'
ModalView = require '../modal/view.coffee'
Form = require '../mixins/form.coffee'
mediator = require '../../lib/mediator.coffee'
analytics = require '../../lib/analytics.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
{ templateMap } = require './maps.coffee'

class State extends Backbone.Model
  defaults: mode: 'register'

module.exports = class AuthView extends Backbone.View
  _.extend @prototype, Form

  className: 'auth authPage'

  template: ->
    templateMap[@state.get 'mode'] arguments...

  events:
    'click .auth-toggle' : 'toggleMode'
    'submit form'        : 'submit'
    'click #auth-submit' : 'submit'

  initialize: (options) ->
    require('./analytics.coffee')()

    { @destination } = options
    @redirectTo = options.redirectTo if options.redirectTo
    @preInitialize options
    super

  preInitialize: (options = {}) ->
    { @copy } = options
    @user = new LoggedOutUser
    mode = mode: options.mode if options.mode
    mediator.trigger 'auth:change:mode', mode
    @state = new State mode

    @templateData =
      pathname: location.pathname
      redirectTo: @redirectTo
      mode: @state.get('mode')

    @listenTo @state, 'change:mode', @render

    mediator.on 'auth:error', @showError
    mediator.on 'modal:closed', @logClose

  setMode: (mode) ->
    @state.set 'mode', mode

  toggleMode: (e) ->
    e.preventDefault()
    @templateData.mode = $(e.currentTarget).data('mode')
    @state.set 'mode', $(e.currentTarget).data('mode')
    mediator.trigger 'auth:change:mode', $(e.currentTarget).data('mode')

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set (data = @serializeForm())

    @user[@state.get 'mode']
      success: @onSubmitSuccess
      error: (model, response, options) =>
        @showError(response?.responseJSON?.message) if response?.responseJSON?.message
        @reenableForm()
        analytics.exception response

  onSubmitSuccess: (model, response, options) =>
    @$('button').attr 'data-state', 'success'

    if response?.error?
      @reenableForm()
      analytics.track.error 'Error: "Invalid login, try again."'
      @showError "Invalid login, try again."
    else
      Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination

      switch @state.get('mode')
        when 'login'
          mediator.trigger 'current_user:logged_in'
          analytics.track.submit 'User logged in'
          Cookies.set('signed_in', true, expires: 60 * 60 * 24 * 7)
          if @redirectTo
            location.href = @redirectTo
          else
            location.reload()
        when 'signup'
          analytics.track.submit 'User requested invitation'
          @showSuccess "Please check your email for registration details."
        when 'forgot'
          analytics.track.submit 'User reset password'
          @showSuccess "Please check your email for password reset details."

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

  showSuccess: (msg) ->
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active is-success').text msg

  render: ->
    @$el.html @template @templateData
    _.defer => @$('input[name="email"]').focus()

    this

  remove: ->
    mediator.off 'auth:change:mode'
    mediator.off 'auth:error'
    mediator.off 'modal:closed'
    super
