Backbone = require 'backbone'
Base = require './base.coffee'
sd = require('sharify').data
User = require '../models/user.coffee'

module.exports = class Contacts extends Base
  model: User

  parse: (response) -> response.users