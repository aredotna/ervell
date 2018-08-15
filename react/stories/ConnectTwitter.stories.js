import React from 'react';
import { storiesOf } from '@storybook/react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import contactFragment from 'react/components/ConnectTwitter/components/Contact/fragments/index';

import ConnectTwitter from 'react/components/ConnectTwitter';
import Contact from 'react/components/ConnectTwitter/components/Contact/index';

storiesOf('ConnectTwitter', module)
  .add('Dialog', () => (
    <ConnectTwitter />
  ))
  .add('Contact', () => (
    <Query
      query={gql`
        query user {
          user(id: 2) {
            ...Contact
          }
        }
        ${contactFragment}
      `}
    >
      {({ loading, data, error }) => {
        if (loading) {
          return <div>loading</div>;
        }
        if (error) {
          return <div>ERROR: {error}</div>;
        }

        return <Contact user={data.user} />;
      }}
    </Query>
  ));
