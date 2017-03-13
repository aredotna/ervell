_ = require 'underscore'
md = require 'marked'
EditableAttributeView = require './editable_attribute_view.coffee'
MentionQuicksearch = require '../../mention_quicksearch/client/mention_quicksearch_view.coffee'

module.exports = class CommentEditableAttributeView extends EditableAttributeView

  events: _.extend EditableAttributeView.prototype.events,
    'click .attr-value a': 'preventEdit'

  initialize: ->
    super

  preventEdit: (e) ->
    e.stopPropagation()

  beginEdit: ->
    super
    @quicksearch = new MentionQuicksearch
      container: @$el,
      input: @$('textarea')

  endEdit: ->
    super
    @quicksearch.dispose()
    @quicksearch = null

  getRenderData: ->
    _.extend super,
      value_html: md(@model.getHTML())
