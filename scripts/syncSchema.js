require('dotenv').config()

import { execSync } from 'child_process'

execSync(
  `yarn run apollo schema:download --endpoint=https://api.are.na/graphql --header='X-APP-TOKEN: ${
    process.env.GRAPHQL_XAPP_TOKEN
  }'`
)
