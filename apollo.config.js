const fs = require('fs')

const getEnv = () => {
  switch (true) {
    case fs.existsSync('.env'):
      return '.env'
    case fs.existsSync('.env.staging'):
      return '.env.staging'
    case fs.existsSync('.env.production'):
      return '.env.production'
  }
}

require('dotenv').config({
  path: getEnv(),
})

// Configuration for the vscode-apollo extension and other Apollo tooling.
module.exports = {
  client: {
    service: {
      name: 'are.na',
      url: 'https://api.are.na/graphql',
      headers: {
        'X-APP-TOKEN': process.env.GRAPHQL_XAPP_TOKEN,
      },
    },
    includes: ['src/**/*.ts', 'src/v2/apollo/localState/clientSchema.graphql'],
    tagName: 'gql',
  },
}
