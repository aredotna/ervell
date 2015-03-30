Base = require './base.coffee'
Backbone = require 'backbone'
Backbone.LocalStorage = require 'backbone.localstorage'
Block = require "../models/block.coffee"

module.exports = class RecentConnections extends Backbone.Collection

  model: Block

  localStorage: new Backbone.LocalStorage "RecentConnections"