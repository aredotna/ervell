require('./src/lib/loadEnv')

// Configuration for the vscode-apollo extension and other Apollo tooling.
module.exports = {
  client: {
    service: {
      name: 'are.na',
      url: 'https://api.are.na/graphql',
      headers: {
        'X-APP-TOKEN': process.env.X_APP_TOKEN,
      },
    },
    includes: ['src/**/*.ts', 'src/v2/apollo/localState/clientSchema.graphql'],
    tagName: 'gql',
  },
}
