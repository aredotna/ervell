Base = require './base.coffee'
User = require '../models/user.coffee'

module.exports = class Contacts extends Base
  model: User

  parse: ({ users }) ->
    users
