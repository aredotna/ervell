Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
Form = require '../../components/mixins/form.coffee'
AuthView = require '../../components/auth/view.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'

module.exports = class ResetPasswordView extends Backbone.View
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
        document.location.href = '/log_in'

      error: =>
        @showError "Password invalid, try retyping and submitting again."

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').addClass('is-active').text msg

module.exports.init = ->
  switch sd.CURRENT_PATH
    when '/log_in', '/sign_up'
      console.log 'sd.MODE', sd.MODE
      view = new AuthView
        mode: sd.MODE
        el: $('.container')

      view.render()
    else
      pwReset = new Backbone.Model id: sd.TOKEN
      pwReset.url = -> "#{sd.API_URL}/accounts/passwords/#{@id}"

      new ResetPasswordView
        el: $('#reset-password-page')
        model: pwReset
