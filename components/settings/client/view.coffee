_ = require 'underscore'
Backbone = require 'backbone'
ModalView = require '../../modal/view.coffee'
Form = require '../../mixins/form.coffee'
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
CurrentUser = require '../../../models/logged_out_user.coffee'

template = -> require('../templates/settings.jade') arguments...

module.exports = class SettingsView extends ModalView
  _.extend @prototype, Form

  template: -> template arguments...

  events: -> _.extend super,
    'click .auth-toggle' : 'toggleMode'
    'submit form'        : 'submit'
    'click #auth-submit' : 'submit'

  initialize: (options) ->
    @preInitialize options
    super

  preInitialize: (options = {}) ->
    @templateData =
      pathname: location.pathname

    mediator.on 'modal:closed', @logClose

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
          @showError "Registration recieved. Please check your email for registration details."
        when 'forgot'
          analytics.track.submit 'User reset password'
          @showError "Please check your email for password reset details."

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

  remove: ->
    mediator.off 'modal:closed'
    super