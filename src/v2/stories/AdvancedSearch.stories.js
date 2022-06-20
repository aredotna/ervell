import React, { useState } from 'react'

import Specimen from 'v2/stories/__components__/Specimen'

import AdvancedSearch from 'v2/components/AdvancedSearch'
import { AdvancedSearchContextProvider } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

const meta = {
  title: 'AdvancedSearch',
  component: AdvancedSearch,
}

export default meta

const Template = args => {
  const [variables, setVariables] = useState(args.variables)
  const [query, setQuery] = useState(args.query)

  const onVariablesChange = variables => {
    setVariables(variables)
  }

  const onQueryChange = query => {
    setQuery(query)
  }

  const printedState = JSON.stringify(variables, null, 2)

  return (
    <>
      <Specimen>
        <AdvancedSearchContextProvider
          query={query}
          variables={variables}
          onQueryChange={onQueryChange}
          onVariablesChange={onVariablesChange}
        >
          <AdvancedSearch />
        </AdvancedSearchContextProvider>
      </Specimen>
      <pre>{printedState}</pre>
    </>
  )
}

export const Primary = Template.bind({})

export const WithDefaultValues = Template.bind(
  {},
  {
    query: `hello world`,
    variables: {
      term: { facet: 'hello world' },
      where: { facets: ['FOLLOWING'] },
      what: { facets: ['CHANNEL'] },
    },
  }
)

// // Primary.parameters = {
// //   apolloClient: {
// //     mocks: [
// //       {
// //         request: {
// //           query: userDropdownQuery,
// //           variables: {}
// //         },
// //         result: {
// //           data: {
// //             me: MockObjects.Me()
// //           }
// //         }
// //       }
// //     ]
// //   }
// // }
