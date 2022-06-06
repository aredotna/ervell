import React from 'react'

import Specimen from 'v2/stories/__components__/Specimen'

import userDropdownQuery from 'v2/components/UserDropdown/queries/userDropdown'
import UserDropdown from 'v2/components/UserDropdown'
import { MockObjects } from '../../../.storybook/mocks'

const meta = {
  title: 'UserDropdown',
  component: UserDropdown,
}

console.log({ meta }, '💍🧤🧢🐠🌞🌹')

export default meta

const Template = () => (
  <Specimen>
    <UserDropdown />
  </Specimen>
)

export const Primary = Template.bind({})

Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: userDropdownQuery,
          variables: {},
        },
        result: {
          data: {
            me: MockObjects.Me(),
          },
        },
      },
    ],
  },
}
