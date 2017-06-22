{ shuffle } = require 'underscore'
{ API_URL } = require('sharify').data
{ DEMO_USER_AUTH_TOKEN } = process.env
GQL = require '../../lib/graphql'
cached = require '../../lib/cached'

@index = (_req, res, next) ->
  # Caches for 24 hours
  cached 'homepage:demo-blocks', 86400, ->
    send =
      token: DEMO_USER_AUTH_TOKEN
      query: """
        {
          channel(id: "are-na-connect-everything") {
            blocks(per: 100) {
              ... blockThumb
            }
          }
        }

        #{require '../../components/block_v2/queries/block'}
      """

    GQL send

  .then ({ channel: { blocks }}) ->
    res.locals.sd.DEMO_BLOCKS = demoBlocks = shuffle blocks

    res.render 'index',
      demoBlocks: demoBlocks

  .catch next
