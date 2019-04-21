require('dotenv').config()

// Configuration for the vscode-apollo extension.
module.exports = {
  client: {
    service: {
      name: 'are.na',
      url: 'https://api.are.na/graphql',
      headers: {
        'X-APP-TOKEN': process.env.GRAPHQL_XAPP_TOKEN,
      },
    },
    excludes: [
      '**/node_modules',

      // Exclude local schema copies as we're pulling from the remote api server.
      // See https://github.com/apollographql/apollo-tooling/issues/801#issuecomment-479010780
      'src/v2/apollo/schema.graphql',
      'src/v2/apollo/schema.json',
    ],
    includes: ['src/**/*.{ts,tsx}'],
    tagName: 'gql',
  },
}
