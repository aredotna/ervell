Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
Form = require '../../components/mixins/form.coffee'
Invitee = require '../../models/invitee.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'

module.exports = class RegistrationView extends Backbone.View
  _.extend @prototype, Form

  events:
    'submit form'        : 'submit'
    'click #auth-submit' : 'submit'

  submit: (e)->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @model.set (data = @serializeForm())

    @model.save {},
      success: =>
        @$('button').attr 'data-state', 'success'
        user = new LoggedOutUser @model.pick 'email', 'password'
        user.login { redirect: "/#{@model.get('slug')}" }
      error: =>
        @showError "Invalid registration, try retyping your password and submitting again."

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

module.exports.init = ->
  invitee = new Invitee sd.INVITEE

  new RegistrationView
    el: $('#registration-page')
    model: invitee
