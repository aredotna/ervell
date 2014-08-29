#
# Base model to extend from
#
Backbone = require 'backbone'
Model = require("chaplin").Model
CurrentUser = require './current_user.coffee'
sd = require("sharify").data

module.exports = class Base extends Model