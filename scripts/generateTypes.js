import { execSync } from 'child_process'

execSync(
  `yarn run graphql-typescript-definitions --schema-path 'src/v2/apollo/schema.json' --schema-types-path='src/v2/apollo/'`
)
