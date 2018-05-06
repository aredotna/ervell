Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'

module.exports = class BioFieldView extends Backbone.View
  events:
    'keyup': 'updateMetadata'

  updateMetadata: (e) ->
    value = e.currentTarget.value
    
    currentMeta = @model.get('metadata')
    currentMeta = {} if not currentMeta
    currentMeta.description = value
    
    @model.set 'metadata', currentMeta