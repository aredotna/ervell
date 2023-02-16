import React from 'react'
import { useQuery } from '@apollo/client'

import groupBillingQuery from 'v2/components/Billing/components/GroupBilling/queries/groupBilling'

import Box from 'v2/components/UI/Box'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import MyGroups from 'v2/components/Billing/components/MyGroups'
import { GroupBilling as GroupBillingQueryType } from '__generated__/GroupBilling'

export const GroupBilling: React.FC = () => {
  const { loading, error, data } = useQuery<GroupBillingQueryType>(
    groupBillingQuery,
    { ssr: false }
  )

  return (
    <Box
      width={['100%', '75%', '50%']}
      mx="auto"
      mt={6}
      mb={8}
      position="relative"
    >
      {loading && <LoadingIndicator my={9} />}
      {error && <ErrorAlert>{error.message}</ErrorAlert>}
      {data && data.me && <MyGroups me={data.me} groups={data.me.groups} />}
    </Box>
  )
}

export default GroupBilling
