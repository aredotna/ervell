require('./src/lib/loadEnv')

// Configuration for the vscode-apollo extension and other Apollo tooling.
module.exports = {
  client: {
    service: {
      name: 'are.na',
      url: process.env.GRAPHQL_ENDPOINT,
      headers: {
        'X-APP-TOKEN': process.env.X_APP_TOKEN,
      },
    },
    includes: ['src/**/*.ts', 'src/v2/apollo/localState/clientSchema.graphql'],
    tagName: 'gql',
  },
}
