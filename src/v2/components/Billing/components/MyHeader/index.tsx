import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import MemberAvatar from 'v2/components/MemberAvatar'
import UpcomingInvoice from 'v2/components/Billing/components/UpcomingInvoice'
import { MyHeader as MyHeaderType } from '__generated__/MyHeader'

const Header = styled(Box).attrs({
  mb: 7,
})`
  display: flex;
  align-items: flex-start;
`

interface MyHeaderProps {
  me: MyHeaderType
}

export const MyHeader: React.FC<MyHeaderProps> = ({ me }) => {
  return (
    <Header>
      <MemberAvatar member={me} size={80} isLinked={false} circle />

      <Box ml={6}>
        <Text f={6} mb={2} fontWeight="bold">
          {me.name}
        </Text>

        <UpcomingInvoice customer={me.customer} />
      </Box>
    </Header>
  )
}

export default MyHeader
