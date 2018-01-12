{ CHANNEL, COLLABORATORS } = require('sharify').data
mediator = require '../../../../lib/mediator.coffee'
Collaborators = require '../../../../collections/collaborators.coffee'
modalize = require '../../../../components/modalize/index.coffee'
ManageCollaboratorsView = require './view.coffee'

openModal = (options = {}) ->
  view = new ManageCollaboratorsView options
  modal = modalize view, className: 'modalize ManageCollaboratorsModal'
  modal.open()
  modal

module.exports = ->
  { shared: { current_user } } = mediator

  collection = new Collaborators COLLABORATORS, id: CHANNEL.id

  openModal
    current_user: current_user
    collection: collection

  $('.js-open-manage-collaborators')
    .click (e) ->
      e.preventDefault()

      openModal
        current_user: current_user
        collection: collection
