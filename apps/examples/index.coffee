express = require 'express'
graphQL = require '../../lib/graphql'

app = module.exports = express()

app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

exampleChannelQuery = """
  query example($id: ID!) {
    channel(id: $id) {
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
  send =
    query: exampleChannelQuery
    user: req.user
    variables:
      id: 'fruit-crate-labels'

  graphQL(send)
    .then ({ channel }) ->
      res.locals.sd.CHANNELS = channel
      res.locals.examplechannel = channel
      res.render 'index'
    .catch(next)