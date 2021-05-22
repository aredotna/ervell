import React from 'react'
import { storiesOf } from '@storybook/react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

import Specimen from 'v2/stories/__components__/Specimen'

import userSelectionFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/fragments/userSelection'

import Billing from 'v2/components/Billing'
import PrivateBlocksMeter from 'v2/components/PrivateBlocksMeter'
import UserSelection from 'v2/components/Billing/components/MyGroups/components/UserSelection'

storiesOf('Billing', module)
  .add('Billing', () => (
    <Specimen>
      <Billing />
    </Specimen>
  ))
  .add('PrivateBlocksMeter', () => (
    <Specimen>
      <PrivateBlocksMeter me={{ counts: { private_connections: 66 } }} />
    </Specimen>
  ))
  .add('UserSelection', () => (
    <Specimen>
      <Query
        query={gql`
          query BillingStoriesQuery {
            group(id: 1) {
              __typename
              id
              ...UserSelection
            }
          }
          ${userSelectionFragment}
        `}
      >
        {({ data, loading, error }) => {
          if (loading || error) return ''
          return (
            <UserSelection
              group={data.group}
              upgradeableUsers={data.group.users.filter(
                user => user.is_upgradeable
              )}
            />
          )
        }}
      </Query>
    </Specimen>
  ))
