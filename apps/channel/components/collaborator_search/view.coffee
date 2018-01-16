{ invoke, debounce } = require 'underscore'
Backbone = require 'backbone'
isEmail = require '../../../../lib/is_email.coffee'
InviteCollaboratorView = require '../invite_collaborator/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class CollaboratorSearchView extends Backbone.View
  className: 'CollaboratorSearch'

  subViews: []

  events:
    'input input': ->
      @query arguments...

  initialize: ({ @search, @current_user }) ->
    @state = new Backbone.Model query: ''

    @query = debounce @perform, 200

    @listenTo @state, 'change:query', @maybeInvite

  restore: ->
    @search.reset()

  perform: (e) ->
    e.preventDefault()

    query = $(e.currentTarget).val().trim()

    return if query is @state.get 'query'

    @state.set query: query

    if query.length < 1
      @restore()
      return

    @request?.abort()
    @request = @search.fetch data:
      q: query
      per: 7

  maybeInvite: ->
    invoke @subViews, 'remove'

    if isEmail @state.get('query')
      inviteCollaboratorView =
        new InviteCollaboratorView
          collection: @collection
          email: @state.get 'query'

      @$el.append inviteCollaboratorView.render().$el

      @subViews = [inviteCollaboratorView]

  render: ->
    @$el.html template
      query: @state.get('query')

    this

  remove: ->
    invoke @subViews, 'remove'
    super
