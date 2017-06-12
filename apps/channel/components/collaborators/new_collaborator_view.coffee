Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../../lib/mediator.coffee'
analytics = require '../../../../lib/analytics.coffee'
isEmail = require '../../../../lib/is_email.coffee'
Collaborators = require '../../../../collections/collaborators.coffee'

newCollaboratorTemplate = -> require('./templates/new.jade') arguments...
inviteTemplate = -> require('./templates/invite.jade') arguments...
resultsTemplate = -> require('./templates/results.jade') arguments...

module.exports = class NewCollaboratorView extends Backbone.View

  events:
    'keyup .js-collaborator-input' : 'processQuery'
    'click .js-collaborator-result' : 'addCollaborator'
    'click .js-collaborator-invite' : 'inviteCollaborator'
    'click .js-collaborator-close' : 'removeResults'

  initialize: ({ @channel, @collaborators} )->
    @_searchCollaborators = _.throttle @_searchCollaborators, 100

  addCollaborator: (e) ->
    @collaborators._add @results.get $(e.currentTarget).data 'id'

  inviteCollaborator: (e) ->
    @collaborators._invite $(e.currentTarget).data 'email'

  query: ->
    @$input.val()

  processQuery: ->
    query = @query()
    if query.length > 0
      @getResults query
    else
      @removeResults()
    
  getResults: (query) -> 
    @$('.new-collaborator__close').addClass 'is-active' 
    if isEmail query
      @showInvite query
    else
      @_searchCollaborators()

  _searchCollaborators: =>
    query = @query()

    $.get "#{sd.API_URL}/search/users/?q=#{query}&per=6", (response) =>
      # IDs of the current channel collaborators, author
      ids = @collaborators.pluck 'id'
      ids.push @channel.get('user').id

      if response.length > 1
        results = _.reject response.users, (user) -> 
          _.contains ids, parseInt(user.id)
      else
        results = response.users if not _.contains ids, response.users.id
      
      @results = new Collaborators results, 
        channel_slug: @channel.get('slug')

      @showResults()

  showInvite: (email) ->
    @$('.js-collaborator-results').html inviteTemplate 
      email: email
      query: @query()

  showResults: ->
    @$('.js-collaborator-results').html resultsTemplate 
      collaborators: @results.models
      query: @query()

  removeResults: ->
    @$input.val ""
    @$('.new-collaborator__close').removeClass 'is-active' 
    @$('.js-collaborator-results').html ""

  render: ->
    @$el.html newCollaboratorTemplate()

    @_postRender()

  _postRender: ->
    @$input = @$('input.js-collaborator-input')
    @$input.focus()


  
