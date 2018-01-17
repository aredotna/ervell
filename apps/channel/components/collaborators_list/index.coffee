CollaboratorsListView = require './view.coffee'

module.exports = ({ collection }) ->
  view = new CollaboratorsListView
    collection: collection

  $('.js-collaborators-list')
    .html view.render().$el

  view
