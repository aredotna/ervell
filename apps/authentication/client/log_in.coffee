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
      .then  ->
        $submit.text 'Redirecting...'

        location.href = REDIRECT_TO

      .catch ({ responseJSON: { message, description }}) ->
        # TODO: Redirect to resend page when login
        # fails due to an unconfirmed account

        console.error message

        $errors.show()
          .text description

        $submit
          .prop 'disabled', false
          .text 'Try again'

        setTimeout ->
          $submit.text label
          $errors.empty()
        , 2500
