import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import groupOwnerFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/GroupOwner/fragments/groupOwner'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import UserAvatar from 'v2/components/UserAvatar'

const Container = styled(Box).attrs({
  py: 3,
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
})`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
`

export default class GroupOwner extends PureComponent {
  static propTypes = {
    user: propType(groupOwnerFragment).isRequired,
  }

  render() {
    const { user } = this.props

    return (
      <Container>
        <UserAvatar user={user} />

        <Box display="flex" flexDirection="column" flex={1} pl={6}>
          <Text f={1} fontWeight="bold">
            {user.name}
          </Text>

          <Text f={1} color="gray.medium">
            {user.hidden_email}
          </Text>
        </Box>

        <Text f={1} color="gray.medium" fontWeight="bold">
          {user.is_premium
            ? 'Already Premium'
            : 'Not upgraded (Manage using individual billing above)'}
        </Text>
      </Container>
    )
  }
}
