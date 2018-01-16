modalize = require '../../../../components/modalize/index.coffee'
ManageCollaboratorsView = require './view.coffee'

openModal = (options = {}) ->
  view = new ManageCollaboratorsView options
  modal = modalize view, className: 'modalize ManageCollaboratorsModal'
  modal.open()
  modal

module.exports = ({ collection, current_user }) ->
  openModal
    current_user: current_user
    collection: collection

  $('.js-open-manage-collaborators')
    .click (e) ->
      e.preventDefault()

      openModal
        current_user: current_user
        collection: collection
