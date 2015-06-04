Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
AvatarView = require '../../../components/settings/client/avatar_view.coffee'
Form = require '../../../components/mixins/form.coffee'

module.exports = class SettingsView extends Backbone.View
  _.extend @prototype, Form

  events:
    'submit form'          : 'submit'
    'click #auth-settings' : 'submit'

  initialize: ->
    @model = mediator.shared.current_user

    $.ajax
      url: "#{sd.API_URL}/uploads/policy"
      success: (policy) =>
        new AvatarView
          el: @$('#avatar')
          policy: policy

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
      $.ajax
        url: '/me/refresh'
        type: 'GET'
        beforeSend: (xhr)->
          xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token
        success: ->
          location.reload()

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

module.exports.init = ->
  new SettingsView
    el: $ '#auth-page'