Serializer = require '../../../components/form/serializer.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports = ->
  $el = $('.js-authentication')

  $form = $el.find '.js-form'
  $submit = $el.find '.js-submit'
  $errors = $el.find '.js-errors'

  label = $submit.text()

  $form.on 'submit', (e) ->
    e.preventDefault()

    $errors.empty()

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
            Please check your email for a link to reset your password
          </div>
        """

        $submit
          .prop 'disabled', true
          .text 'Sent'

        track.submit 'User forgot password'

      error: ({ responseJSON: { description }}) ->
        $errors.show()
          .text description

        $submit
          .prop 'disabled', false
          .text 'Try again'

        track.error 'User forgot password error'
