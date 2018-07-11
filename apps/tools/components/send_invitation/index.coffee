Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
{ track } = require '../../../../lib/analytics.coffee'
Serializer = require '../../../../components/form/serializer.coffee'

module.exports = ($el) ->
  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  submissionTimeout = null
  label = $submit.text()

  onSuccess = () ->
    $form.trigger 'reset'

    $submit
      .prop 'disabled', false
      .text 'Sent!'

    submissionTimeout = setTimeout (-> $submit.text label), 2500

    track.submit 'Invitation sent from user'

  onFailure = (message) ->
    $errors
      .show()
      .html message

    $submit
      .prop 'disabled', false
      .text 'Error'

    submissionTimeout = setTimeout ->
      $submit.text label
      $errors.empty()
    , 5000

    track.error 'Invitation not sent, try again.'

  $form.on 'submit', (e) ->
    e.preventDefault()

    clearTimeout(submissionTimeout)

    serializer = new Serializer $form

    $submit
      .prop 'disabled', true
      .text 'Sending...'

    Promise $.ajax
      url: "#{API_URL}/invitees/invite"
      type: 'POST'
      data: serializer.data()

    .then onSuccess

    .catch ({ responseJSON: { message, description }}) ->
      onFailure("#{message}<br/>#{description}")

    .catch ->
      onFailure("Something went wrong, please contact <a href='mailto:info@are.na'>info@are.na</a> if the problem persists.")
