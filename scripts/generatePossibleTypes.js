'use strict'

// eslint-disable-next-line no-undef
const fs = require('fs')

const rawSchema = fs.readFileSync('src/v2/apollo/schema.json')
const schema = JSON.parse(rawSchema)
const possibleTypes = {}

for (const supertype of schema.__schema.types) {
  if (supertype.possibleTypes) {
    possibleTypes[supertype.name] = supertype.possibleTypes
      .map(subtype => subtype.name)
      .sort()
  }
}

const rawPossibleTypes = JSON.stringify(possibleTypes)

fs.writeFileSync('src/v2/apollo/possibleTypes.json', rawPossibleTypes)
