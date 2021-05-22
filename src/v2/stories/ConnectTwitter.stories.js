import React from 'react'
import { storiesOf } from '@storybook/react'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'
import contactFragment from 'v2/components/ConnectTwitter/components/Contact/fragments/contact'

import ConnectTwitter from 'v2/components/ConnectTwitter'
import Contact from 'v2/components/ConnectTwitter/components/Contact/index'

storiesOf('ConnectTwitter', module)
  .add('Dialog', () => <ConnectTwitter />)
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
          return <div>loading</div>
        }
        if (error) {
          return <div>ERROR: {error}</div>
        }

        return <Contact user={data.user} />
      }}
    </Query>
  ))
