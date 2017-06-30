Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
{ track } = require '../../../../lib/analytics.coffee'
Serializer = require '../../../../components/form/serializer.coffee'

module.exports = ($el) ->
  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  $form.on 'submit', (e) ->
    e.preventDefault()

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

      setTimeout (-> $submit.text label), 2500

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

      setTimeout ->
        $submit.text label
        $errors.empty()
      , 5000

      track.error 'Invitation not sent, try again.'
