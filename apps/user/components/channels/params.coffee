Backbone = require 'backbone'

module.exports = class Params extends Backbone.Model
  defaults:
    page: 1
    per: 2
    sort: 'UPDATED_AT'
    q: null