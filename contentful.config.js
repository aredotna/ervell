require('./src/lib/loadEnv')

// Configuration for the vscode-apollo extension and other Apollo tooling.
module.exports = {
  client: {
    service: {
      name: 'contentful',
      url: process.env.CLIENT_CONTENTFUL_GRAPHQL_ENDPOINT,
    },
    includes: ['src/**/contentfulQueries/*.ts'],
    tagName: 'gql',
  },
}
