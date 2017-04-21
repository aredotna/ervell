{ extend } = require 'underscore'
{ API_URL } = require('sharify').data
Model = require './base.coffee'
Sources = require '../collections/sources.coffee'
Subscriptions = require '../collections/subscriptions.coffee'
Moment = require './mixins/moment.coffee'

module.exports = class Customer extends Model
  extend @prototype, Moment

  url: "#{API_URL}/account/customer"

  related: ->
    return @__related__ if @__related__?

    sources = new Sources(@get('sources'))
    subscriptions = new Subscriptions(@get('subscriptions'))

    @__related__ =
      sources: sources
      subscriptions: subscriptions
      subscription: subscriptions.first()
