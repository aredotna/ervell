AddBlockView = require '../client/view.coffee'

module.exports = ({ $el, collection }) ->
  addBlockView = new AddBlockView el: $el, collection: collection

  init: ->
    addBlockView.postRender()

  reset: ->
    addBlockView.undelegateEvents()
    addBlockView = new AddBlockView el: $($el.selector), collection: collection
    addBlockView.postRender()
