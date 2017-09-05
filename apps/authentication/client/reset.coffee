Serializer = require '../../../components/form/serializer.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports = (token) ->
  $el = $('.js-authentication')

  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  label = $submit.text()

  $form.on 'submit', (e) ->
    e.preventDefault()

    serializer = new Serializer $form

    $submit
      .prop 'disabled', true
      .text 'Resetting...'

    $.ajax
      url: $form.attr 'action'
      method: $form.attr 'method'
      data: serializer.data()
      success: ->
        $errors.replaceWith $ """
          <div class='Success'>
            Password successfully reset.
            <a href='/log_in'>Click here to login.</a>
          </div>
        """

        $submit
          .prop 'disabled', true
          .text 'Reset'

        track.submit 'User successfully reset password'

      error: ({ responseJSON: { description }}) ->
        $errors.show()
          .text description

        $submit
          .prop 'disabled', false
          .text 'Try again'

        setTimeout ->
          $submit.text label
          $errors.empty()
        , 5000

        track.error 'User reset password error'
