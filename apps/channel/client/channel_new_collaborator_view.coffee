Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
Collaborators = require '../../../collections/collaborators.coffee'

newCollaboratorTemplate = -> require('../templates/collaborators/new_collaborator.jade') arguments...
collaboratorResultsTemplate = -> require('../templates/collaborators/collaborator_results.jade') arguments...

module.exports = class newCollaboratorView extends Backbone.View

  events:
    'keyup #new-collaborator__search'          : 'searchCollaborators'
    'click .new-collaborator__add'             : 'openSearch'
    'click .new-collaborator__results__result' : 'addCollaborator'

  initialize: ({ @channel, @collaborators} )->
    @render()

  maybeClear: (e)=>
    analytics.track.click "Collaborator added on #{@channel.get('status')} channel"
    @clear() unless $(e.target).closest('#metadata--collaborators').length

  addCollaborator: (e) ->
    @collaborators._add @results.get $(e.target).data 'id'

  searchCollaborators: ->
    query = @$('#new-collaborator__search').val()

    $.get "#{sd.API_URL}/search/users/?q=#{query}&per=10", (response) =>
      # IDs of the current channel collaborators, author
      ids = @collaborators.pluck 'id'
      ids.push @channel.get('user').id

      if response.length > 1
        results = _.reject response.users, (user) -> _.contains(ids, user.id)
      else
        results = response.users if not _.contains ids, response.users.id
      
      @results = new Collaborators results

      # Set the results
      @showResults()

  showResults: ->
    @$('.new-collaborator__results').html collaboratorResultsTemplate 
      collaborators: @results.models

  openSearch: ->
    @$el.addClass 'is-active'
    @$('#new-collaborator__search').focus()
    $(window).one 'tap', @maybeClear
    mediator.trigger 'collaborators:editing'

  render: ->
    @$el.html newCollaboratorTemplate()

  clear: ->
    $(window).off 'tap', @maybeClear
    @$el.removeClass 'is-active'
    mediator.trigger 'collaborators:reading'
