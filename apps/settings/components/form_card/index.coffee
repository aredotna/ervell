Promise = require 'bluebird-q'
Serializer = require '../../../../components/form/serializer.coffee'

module.exports = ($el, onSubmit = -> Promise.resolve()) ->
  $submit = $el.find('button')
  $errors = $el.find('.js-form-errors')

  label = $submit.text()

  $el.on 'submit', (e) ->
    e.preventDefault()

    serializer = new Serializer $el

    $submit
      .prop 'disabled', true
      .text 'Saving...'

    Promise.all [
      $.ajax(
        url: $el.data('action')
        method: $el.data('method')
        data: serializer.data()
      ),
      onSubmit()
    ]
    .then ->
      Promise $.get('/me/refresh')

    .then ->
      $submit.text 'Success'
      location.reload()

    .catch (err) ->
      $errors
        .show()
        .html """
          #{err.responseJSON.message}<br>
          #{err.responseJSON.description}
        """

      $submit
        .prop 'disabled', false
        .text 'Error'

      setTimeout (-> $submit.text label), 5000
