import React, { PureComponent } from 'react'
import { Query } from '@apollo/client/react/components'

import groupBillingQuery from 'v2/components/Billing/queries/groupBilling'

import Box from 'v2/components/UI/Box'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import MyGroups from 'v2/components/Billing/components/MyGroups'

export default class GroupBilling extends PureComponent {
  render() {
    return (
      <Box
        width={['100%', '75%', '50%']}
        mx="auto"
        mt={6}
        mb={8}
        position="relative"
      >
        <Query query={groupBillingQuery} ssr={false}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LoadingIndicator my={9} />
            }

            if (error) {
              return <ErrorAlert>{error.message}</ErrorAlert>
            }

            const { me } = data

            return <MyGroups me={me} />
          }}
        </Query>
      </Box>
    )
  }
}
