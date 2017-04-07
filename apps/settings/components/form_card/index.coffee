Serializer = require '../../../../components/form/serializer.coffee'

module.exports = ($el) ->
  $submit = $el.find('button')
  $errors = $el.find('.js-form-errors')

  label = $submit.text()

  $el.on 'submit', (e) ->
    e.preventDefault()

    serializer = new Serializer $el

    $submit
      .prop 'disabled', true
      .text 'Saving...'

    $.ajax
      url: $el.data('action')
      method: $el.data('method')
      data: serializer.data()

      success: ->
        $submit.text 'Success'
        location.reload()

      error: (xhr) ->
        $errors
          .show()
          .html """
            #{xhr.responseJSON.message}<br>
            #{xhr.responseJSON.description}
          """

        $submit
          .prop 'disabled', false
          .text 'Error'

        setTimeout (-> $submit.text label), 5000
