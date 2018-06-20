express = require 'express'
Promise = require 'bluebird-q'

graphQL = require '../../lib/graphql'
examples = require './examples.coffee'
{ first, map, each, find, rest } = require 'underscore'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

DEFAULT_ARGS = 
  page: 1
  per: 6

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

getExamplePage = (page = 1, user) ->
  offset = (page - 1) * DEFAULT_ARGS.per
  examplesPage = rest(examples, offset).slice(0, DEFAULT_ARGS.per)

  Promise.all(
    map examplesPage, (example) ->
      send =
        query: exampleChannelQuery
        user: user
        variables:
          ids: first(example.channel_ids, 2)
      graphQL(send)
  )
  .then (results) ->
    each results, (result, i) ->
      examplesPage[i].channels = result.channels
    examplesPage
  

app.get '/api/examples/:id', (req, res, next) ->
  example = find(examples, (example) -> example.id is req.params.id)
  send =
    query: exampleChannelQuery
    user: req.user
    variables:
      ids: example.channel_ids

  graphQL(send).then ({ channels }) ->
    example.channels = channels
    res.json example

app.get '/api/examples', (req, res, next) ->
  getExamplePage(req.query.page, req.user).then (examplesPage) ->
    res.json examplesPage

app.get '/examples', (req, res, next) ->
  getExamplePage(1, req.user).then (examplesPage) ->
    res.locals.examples = examplesPage
    res.locals.totalExamples = examples.length
    res.locals.totalPages = Math.ceil(examples.length / DEFAULT_ARGS.per)
    res.render 'index'
  .catch(next)