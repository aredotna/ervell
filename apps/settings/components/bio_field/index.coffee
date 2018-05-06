BioFieldView = require './view.coffee'

module.exports = ($el, { user, $form }) ->
  view = new BioFieldView
    el: $el
    model: user

  view.render()
  view