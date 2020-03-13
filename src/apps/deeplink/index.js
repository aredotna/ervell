import express from 'express'
import deeplink from 'node-deeplink'

import { ITUNES_LINK } from 'config.coffee'

const app = express()

app.get(
  '/deeplink',
  deeplink({
    fallback: 'https://www.are.na/about',
    android_package_name: 'na.are.arenaapp',
    ios_store_link: ITUNES_LINK,
  })
)

module.exports = app
