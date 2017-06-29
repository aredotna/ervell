HomePathFieldView = require './view.coffee'

module.exports = ($el, { user }) ->
  view = new HomePathFieldView
    el: $el
    model: user

  view.render()
  view
