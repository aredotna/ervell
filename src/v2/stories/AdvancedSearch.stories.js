import React, { useState } from 'react'

import Specimen from 'v2/stories/__components__/Specimen'

import AdvancedSearch from 'v2/components/AdvancedSearch'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'

const meta = {
  title: 'AdvancedSearch',
  component: AdvancedSearch,
}

export default meta

const Template = args => {
  const [state, setState] = useState(args.searchState)

  const onChange = variables => {
    setState(variables)
  }

  const printedState = JSON.stringify(state, null, 2)

  return (
    <>
      <Specimen>
        <AdvancedSearch searchState={args.searchState} onChange={onChange} />
      </Specimen>
      <pre>{printedState}</pre>
    </>
  )
}

export const Primary = Template.bind({})
export const WithDefaultValues = Template.bind(
  {},
  {
    searchState: {
      term: { facet: 'hello world' },
      where: { facets: ['FOLLOWING'] },
      what: { facets: ['CHANNEL', 'IMAGE'] },
    },
  }
)

export const WithFilter = () => {
  const initialState = { where: { facets: ['FOLLOWING'] } }
  const [state, setState] = useState(initialState)

  const onChange = variables => {
    setState(variables)
  }

  const printedState = JSON.stringify(state, null, 2)

  return (
    <>
      <Specimen>
        <AdvancedSearch searchState={state} onChange={onChange} />
        <AdvancedSearchFilter searchState={state} />
      </Specimen>
      <pre>{printedState}</pre>
    </>
  )
}

// Primary.parameters = {
//   apolloClient: {
//     mocks: [
//       {
//         request: {
//           query: userDropdownQuery,
//           variables: {}
//         },
//         result: {
//           data: {
//             me: MockObjects.Me()
//           }
//         }
//       }
//     ]
//   }
// }
