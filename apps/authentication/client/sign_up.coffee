Promise = require 'bluebird-q'
Serializer = require '../../../components/form/serializer.coffee'
LoggedOutUser = require '../../../models/logged_out_user.coffee'
Registration = require '../../../models/registration.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports = ->
  $el = $('.js-authentication')

  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  registration = new Registration

  label = $submit.text()

  $form.on 'submit', (e) ->
    e.preventDefault()

    serializer = new Serializer $form

    $submit
      .prop 'disabled', true
      .text 'Registering...'

    Promise registration.save(serializer.data())
      .then ->
        $submit.text 'Logging in...'

        user = new LoggedOutUser registration.pick 'email', 'password'

        track.submit 'User successfully registered'

        Promise user.login()

      .then ->
        location.href = '/welcome'

      .catch (err) ->
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

        track.error 'User registration error'
