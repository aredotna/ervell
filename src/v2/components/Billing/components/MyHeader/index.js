import React, { PureComponent } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import myHeaderFragment from 'v2/components/Billing/components/MyHeader/fragments/myHeader'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import MemberAvatar from 'v2/components/MemberAvatar'
import UpcomingInvoice from 'v2/components/Billing/components/UpcomingInvoice'

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
`

export default class MyHeader extends PureComponent {
  static propTypes = {
    me: propType(myHeaderFragment).isRequired,
  }

  render() {
    const { me, ...rest } = this.props

    return (
      <Header {...rest}>
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
}
