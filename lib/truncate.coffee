{ take } = require 'underscore'

module.exports = (text, length = 50) ->
  return unless text
  tokens = text.split ' '
  truncated = take(tokens, length).join(' ')
  truncated = truncated + "..." if tokens.length > length
  truncated