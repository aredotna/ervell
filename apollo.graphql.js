// Configuration for the vscode-apollo extension.
module.exports = {
  client: {
    service: {
      name: 'local',
      localSchemaFile: 'src/v2/apollo/schema.graphql',
    },
    excludeValidationRules: [],
    includes: ['src/**/*.{ts,tsx,graphql}'],
    excludes: ['**/node_modules'],
    tagName: 'gql',
  },
}
