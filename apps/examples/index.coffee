express = require 'express'
Promise = require 'bluebird-q'

graphQL = require '../../lib/graphql'
examples = require './examples.coffee'
{ first, map, each } = require 'underscore'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

exampleChannelQuery = """
  query example($ids: [ID]!) {
    channels(ids: $ids) {
      __typename
      title(truncate: 50)
      updated_at(relative: true)
      user {
        name
      }
      id
      href
      visibility
      counts {
        blocks
      }
      blocks(per: 6, sort_by: POSITION, direction: DESC, type: BLOCK) {
        ... blockThumb
      }
    }
  }
  #{require '../../components/block_v2/queries/block.coffee'}
"""


app.get '/examples', (req, res, next) ->
  Promise.all(
    map first(examples, 3), (example) ->
      send =
        query: exampleChannelQuery
        user: req.user
        variables:
          ids: first(example.channel_ids, 2)
    
      graphQL(send)
  )
  .then (results) ->
    each results, (result, i) ->
      examples[i].channels = result.channels
   
    res.locals.examples = examples
    res.render 'index'
  .catch(next)