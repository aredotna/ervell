Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
{ track } = require '../../../../lib/analytics.coffee'
Serializer = require '../../../../components/form/serializer.coffee'

module.exports = ($el) ->
  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  submissionTimeout = null;

  $form.on 'submit', (e) ->
    e.preventDefault()

    submissionTimeout && clearTimeout(submissionTimeout);

    serializer = new Serializer $form

    label = $submit.text()

    $submit
      .prop 'disabled', true
      .text 'Sending...'

    Promise $.ajax
      url: "#{API_URL}/invitees/invite"
      type: 'POST'
      data: serializer.data()

    .then ->
      $form.trigger 'reset'

      $submit
        .prop 'disabled', false
        .text 'Sent!'

      submissionTimeout = setTimeout (-> $submit.text label), 2500

      track.submit 'Invitation sent from user'

    .catch ({ responseJSON: { message, description }}) ->
      $errors
        .show()
        .html """
          #{message}<br>
          #{description}
        """

      $submit
        .prop 'disabled', false
        .text 'Error'

      submissionTimeout = setTimeout ->
        $submit.text label
        $errors.empty()
      , 5000

      track.error 'Invitation not sent, try again.'

    .catch ->
      $errors
        .show()
        .html """
          Something went wrong, please contact <a href='mailto:info@are.na'>info@are.na</a> if the problem persists.
        """

      $submit
        .prop 'disabled', false
        .text label

      submissionTimeout = setTimeout ->
        $errors.empty()
      , 15000

      track.error 'Invitation not sent: server error. Try again.'
