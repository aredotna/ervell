import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import userSelectorFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import UserAvatar from 'v2/components/UserAvatar'
import ToggleSwitch from 'v2/components/UI/ToggleSwitch'
import { Label } from 'v2/components/UI/Inputs'

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

export default class UserSelector extends PureComponent {
  static propTypes = {
    user: propType(userSelectorFragment).isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment))
      .isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
    onDeselect: () => {},
  }

  state = {
    isSelected: this.props.upgradeableUsers.some(
      upgradeableUser => upgradeableUser.id === this.props.user.id
    ),
  }

  handleToggle = isSelected => {
    const { onSelect, onDeselect, user } = this.props

    this.setState({ isSelected })

    return isSelected ? onSelect(user) : onDeselect(user)
  }

  render() {
    const { user } = this.props
    const { isSelected } = this.state

    return (
      <Container>
        <UserAvatar user={user} />

        <Box flex={1} pl={6} display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            <Text f={1} fontWeight="bold">
              {user.name}
            </Text>

            <Text f={1} color="gray.medium">
              {user.hidden_email}
            </Text>
          </Box>
        </Box>

        {user.is_premium && !user.is_canceled ? (
          <Text
            f={1}
            color={
              { true: 'state.premium', false: 'gray.medium' }[
                user.can.cancel_premium
              ]
            }
            fontWeight="bold"
          >
            Already Premium {!user.can.cancel_premium && '(Managed separately)'}
          </Text>
        ) : (
          <Box display="flex" alignItems="center">
            {user.is_approaching_either_connections_limit &&
              !user.is_exceeding_either_connections_limit && (
                <Label mr={6} color="state.alert">
                  Almost out of blocks
                </Label>
              )}

            {user.is_exceeding_either_connections_limit && (
              <Label mr={6} color="state.alert">
                Out of blocks
              </Label>
            )}

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              minWidth="6em"
            >
              <Text
                mr={5}
                f={1}
                color={isSelected ? 'state.premium' : 'gray.medium'}
                fontWeight="bold"
              >
                {isSelected ? 'Upgrade' : 'Not yet'}
              </Text>

              <ToggleSwitch
                activeColor="state.premium"
                inactiveColor="gray.semiBold"
                onToggle={this.handleToggle}
                value={isSelected}
              />
            </Box>
          </Box>
        )}
      </Container>
    )
  }
}
