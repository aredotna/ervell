import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../config.coffee'

const contentful = require('contentful')

const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
})

export default client
