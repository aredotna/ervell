Promise = require 'bluebird-q'
{ INVITEE } = require('sharify').data
Serializer = require '../../../components/form/serializer.coffee'
Invitee = require '../../../models/invitee.coffee'
LoggedOutUser = require '../../../models/logged_out_user.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports = ->
  $el = $('.js-authentication')

  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  invitee = new Invitee INVITEE

  $form.on 'submit', (e) ->
    e.preventDefault()

    serializer = new Serializer $form

    label = $submit.text()

    $submit
      .prop 'disabled', true
      .text 'Registering...'

    Promise invitee.save(serializer.data())
      .then ->
        $submit.text 'Logging in...'

        user = new LoggedOutUser invitee.pick 'email', 'password'

        track.submit 'User successfully registered'
        track.submit 'User successfully accepted invitation'

        Promise user.login()

      .then ->
        location.href = '/welcome'

      .catch ->
        $errors.show().text """
          Invalid registration.
          Try retyping your password and submitting again.
        """

        $submit
          .prop 'disabled', false
          .text 'Error'

        setTimeout ->
          $submit.text label
          $errors.empty()
        , 5000

        track.error 'User invitation acceptance error'
