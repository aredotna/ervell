mediator = require '../../../lib/mediator.coffee'
AddBlockView = require '../client/view.coffee'

module.exports = ({ $el, collection }) ->
  addBlockView = new AddBlockView collection: collection

  init: ->
    # Render once
    addBlockView.render()

    # Add needed classes for context
    viewMode = mediator.shared.state.get 'view_mode'
    addBlockView.$el
      # `js-` hook used to find for Block insertion
      .addClass 'js-add-block'
      # Context appropriate modifiers
      .addClass if viewMode is 'list' then 'AddBlock--list' else 'grid__block'

    # Insert
    $el.prepend addBlockView.$el

  reset: ->
    addBlockView.undelegateEvents()
    $($el.selector).prepend addBlockView.$el
    addBlockView.delegateEvents()
