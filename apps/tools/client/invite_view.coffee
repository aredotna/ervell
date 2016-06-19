Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
Form = require '../../../components/mixins/form.coffee'

module.exports = class InviteView extends Backbone.View
  _.extend @prototype, Form

  events:
    'submit form' : 'submit'
    'click #send-invitation__button' : 'submit'

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    data = @serializeForm()

    if data.email?
      $.ajax
        url: "#{sd.API_URL}/invitees/invite"
        type: 'POST'
        data: data
        complete: @onSubmitSuccess

  onSubmitSuccess: (xhr, response)=>
    @$('button').attr 'data-state', 'success'

    if response.error?
      @reenableForm()
      analytics.track.error 'Invitation not sent, try again.'
      @showError "Invitation not sent, try again."
    else
      mediator.trigger 'invitation:sent'
      analytics.track.submit 'Invitation sent from user'

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.invitation-errors').addClass('is-active').text msg
