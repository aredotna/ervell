{ shuffle, extend } = require 'underscore'
{ API_URL, HOMEPAGE_SPLASH } = require('sharify').data
{ DEMO_USER_AUTH_TOKEN } = process.env
graphQL = require '../../lib/graphql'
cached = require '../../lib/cached'

@index = (_req, res, next) ->
  # Caches for 24 hours
  cached 'homepage:demo-blocks', 86400, ->
    graphQL
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

  .catch (->) # Ignore query errors

  .then (response) ->
    locals = {}

    if response?
      { channel: { blocks } } = response
      res.locals.sd.DEMO_BLOCKS = demoBlocks = shuffle blocks
      extend locals, demoBlocks: demoBlocks

    extend locals, splash: res.locals.sd.HOMEPAGE_SPLASH
    res.render 'index', locals

  .catch next
