import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { ApolloConsumer } from 'react-apollo';

import billingQuery from 'react/components/Billing/queries/billing';

import myGroupHeaderFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader/fragments/myGroupHeader';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import ButtonGroup from 'react/components/UI/ButtonGroup';
import GenericButton from 'react/components/UI/GenericButton';
import MemberAvatar from 'react/components/MemberAvatar';
import Modal from 'react/components/UI/Modal/Portal';
import ManageGroup from 'react/components/ManageGroup';
import CancelPremiumUserSelection from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection';

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export default class MyGroupHeader extends PureComponent {
  static propTypes = {
    group: propType(myGroupHeaderFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  openEditModal = (e) => {
    e.preventDefault();
    this.setState({ mode: 'edit' });
  }

  openCancelModal = (e) => {
    e.preventDefault();
    this.setState({ mode: 'cancel' });
  }

  closeModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;
    const { group, ...rest } = this.props;

    return (
      <Header {...rest}>
        <div>
          <Text f={6} mb={4}>
            <strong>
              {group.name}
            </strong>
          </Text>

          <ButtonGroup f={1}>
            <GenericButton onClick={this.openEditModal}>
              Edit group
            </GenericButton>

            {group.users.some(({ can: { cancel_premium } }) => cancel_premium) &&
              <GenericButton onClick={this.openCancelModal} color="state.alert">
                Cancel Premium
              </GenericButton>
            }
          </ButtonGroup>
        </div>

        <MemberAvatar
          member={group}
          size={80}
          isLinked={false}
          circle
        />

        {mode === 'edit' &&
          <Modal onClose={this.closeModal}>
            <ApolloConsumer>
              {client => (
                <ManageGroup
                  id={group.id}
                  onClose={() => {
                    // Assume that the member list has changed
                    client.query({ query: billingQuery, fetchPolicy: 'network-only' });
                    this.closeModal();
                  }}
                />
              )}
            </ApolloConsumer>
          </Modal>
        }

        {mode === 'cancel' &&
          <Modal onClose={this.closeModal}>
            <CancelPremiumUserSelection group={group} onClose={this.closeModal} />
          </Modal>
        }
      </Header>
    );
  }
}
