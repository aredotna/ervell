Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class Registration extends Backbone.Model
  url: "#{API_URL}/registrations"
