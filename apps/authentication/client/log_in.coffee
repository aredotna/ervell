{ API_URL, REDIRECT_TO } = require('sharify').data
Promise = require 'bluebird-q'
Serializer = require '../../../components/form/serializer.coffee'
LoggedOutUser = require '../../../models/logged_out_user.coffee'

module.exports = ->
  $el = $('.js-authentication')

  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  label = $submit.text()

  $form.on 'submit', (e) ->
    e.preventDefault()

    serializer = new Serializer $form
    user = new LoggedOutUser serializer.data()

    $submit
      .prop 'disabled', true
      .text 'Logging in...'

    Promise user.login()
      .then ({ success, error }) ->
        if success
          $submit.text 'Redirecting...'

          location.href = REDIRECT_TO

        else
          # `arena-passport` (?) inexplicably sets up a route that 200 OKs on bad logins
          # and just returns a response here with a string description of the error.
          $errors.show().text 'Invalid email/password'

          $submit
            .prop 'disabled', false
            .text 'Try again'

          setTimeout ->
            $submit.text label
            $errors.empty()
          , 2500

      .catch ({ responseJSON: { message }}) ->
        # TODO: Redirect to resend page when login
        # fails due to an unconfirmed account

        $errors.show()
          .text message

        $submit
          .prop 'disabled', false
          .text 'Try again'

        setTimeout ->
          $submit.text label
          $errors.empty()
        , 2500
