{ API_URL } = require('sharify').data
Model = require './base.coffee'

module.exports = class Policy extends Model
  url: "#{API_URL}/uploads/policy"
