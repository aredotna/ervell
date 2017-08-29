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

      .catch (err) ->
        console.error err

        { responseJSON: { message, description }, status } = err

        $errors.show()
          .text description

        $submit
          .prop 'disabled', false
          .text 'Try again'

        setTimeout ->
          $submit.text label
          $errors.empty()
        , 2500

        switch status
          when 401
            location.href = '/confirm/expired'
