#
# The client-side code for a search page
#
_ = require 'underscore'
sd = require("sharify").data
SearchBlocks = require '../../collections/search_blocks.coffee'
setupBlockCollection = require '../../components/blocks/container/client/index.coffee'

module.exports.init = ->
  blocks = new SearchBlocks sd.BLOCKS, { q: sd.SEARCH }

  _.extend blocks.options, subject: sd.SUBJECT

  setupBlockCollection
    $el: $('.search-contents')
    collection: blocks