{ camelize } = require 'underscore.string'

module.exports = ($el, properties) ->
  properties.reduce (memo, property) ->
    memo[camelize(property, true)] = $el.css(property)
    memo
  , {}
