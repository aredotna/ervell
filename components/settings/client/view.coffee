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
    @model = mediator.shared.current_user

    @templateData =
      user: @model
      pathname: location.pathname

    mediator.on 'modal:closed', @logClose

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @model.set (data = @serializeForm())

    @model.save null,
      parse: false
      success: @onSubmitSuccess
      error: (model, response, options) =>
        @reenableForm()
        analytics.exception response

  onSubmitSuccess: (model, response, options) =>
    @$('button').attr 'data-state', 'success'

    if response?.error?
      @reenableForm()
      @showError "Invalid, try again"
    else
      analytics.track.submit 'User settings changed'
      $.ajax('/me/refresh').then -> window.location.reload()


  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

  remove: ->
    mediator.off 'modal:closed'
    super