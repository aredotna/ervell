import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import cancelPremiumUserSelector from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/components/CancelPremiumUserSelector/fragments/cancelPremiumUserSelector';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import UserAvatar from 'react/components/UserAvatar';
import ToggleSwitch from 'react/components/UI/ToggleSwitch';

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
`;

export default class CancelPremiumUserSelector extends PureComponent {
  static propTypes = {
    user: propType(cancelPremiumUserSelector).isRequired,
    cancellableUsers: PropTypes.arrayOf(propType(cancelPremiumUserSelector)).isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
    onDeselect: () => {},
  }

  state = {
    isSelected: this.props.cancellableUsers.some(cancellableUser =>
      cancellableUser.id === this.props.user.id),
  }

  handleToggle = (isSelected) => {
    const { onSelect, onDeselect, user } = this.props;

    this.setState({ isSelected });

    return isSelected ? onSelect(user) : onDeselect(user);
  }

  render() {
    const { user } = this.props;
    const { isSelected } = this.state;

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

        {!user.is_premium
          ? (
            <Text f={1} color="gray.medium" fontWeight="bold">
              Not Premium
            </Text>
          )
          : (
            <Box display="flex" alignItems="center">
              <Text mr={5} f={1} color={isSelected ? 'state.alert' : 'gray.medium'} fontWeight="bold">
                {user.is_canceled ? 'Canceled' : 'Cancel'}
              </Text>

              <ToggleSwitch
                activeColor="state.alert"
                inactiveColor="gray.semiBold"
                onToggle={this.handleToggle}
                value={isSelected}
                disabled={user.is_canceled || !user.can.cancel_premium}
              />
            </Box>
          )
        }
      </Container>
    );
  }
}
