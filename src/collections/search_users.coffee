Backbone = require 'backbone'
{ API_URL } = require('sharify').data
User = require '../models/user.coffee'

module.exports = class SearchUsers extends Backbone.Collection
  model: User

  url: "#{API_URL}/search/users"

  parse: ({ users }) ->
    users
