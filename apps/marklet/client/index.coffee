Backbone = require 'backbone'
{ CONTENT } = require('sharify').data
uuid = require '../../../lib/uuid.coffee'
MarkletView = require '../components/marklet/view.coffee'

module.exports = ->
  document.documentElement.classList.add 'HTML--font-size-invariant'

  model = new Backbone.Model
    id: uuid()
    content: CONTENT

  view = new MarkletView
    el: $('.js-marklet').show()
    model: model

  view.render()
  view
