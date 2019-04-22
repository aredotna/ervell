import React from 'react';
import { storiesOf } from '@storybook/react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Specimen from 'react/stories/__components__/Specimen';

import userSelectionFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/fragments/userSelection';

import Billing from 'react/components/Billing';
import PrivateBlocksMeter from 'react/components/PrivateBlocksMeter';
import UserSelection from 'react/components/Billing/components/MyGroups/components/UserSelection';

storiesOf('Billing', module)
  .add('Billing', () => (
    <Specimen>
      <Billing />
    </Specimen>
  ))
  .add('PrivateBlocksMeter', () => (
    <Specimen>
      <PrivateBlocksMeter
        me={{ counts: { private_connections: 66 } }}
      />
    </Specimen>
  ))
  .add('UserSelection', () => (
    <Specimen>
      <Query
        query={gql`
          {
            group(id: 1) {
              __typename
              id
              ...UserSelection
            }
          }
          ${userSelectionFragment}
        `}
      >
        {({ data: { group }, loading }) => {
          if (loading) return '';
          return <UserSelection group={group} />;
        }}
      </Query>
    </Specimen>
  ));
