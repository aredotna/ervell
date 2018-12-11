import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import myGroupHeaderFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader/fragments/myGroupHeader';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';
import MemberAvatar from 'react/components/MemberAvatar';
import Modal from 'react/components/UI/Modal';
import ManageGroup from 'react/components/ManageGroup';

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export default class MyGroupHeader extends PureComponent {
  static propTypes = {
    group: propType(myGroupHeaderFragment).isRequired,
  }

  openGroupModal = (e) => {
    e.preventDefault();

    const { group: { id } } = this.props;

    const modal = new Modal(ManageGroup, { id });
    return modal.open();
  }

  render() {
    const { group, ...rest } = this.props;

    return (
      <Header {...rest}>
        <div>
          <Text f={6} mb={4}>
            <strong>
              {group.name}
            </strong>
          </Text>

          <GenericButton f={1} onClick={this.openGroupModal}>
            Edit group
          </GenericButton>
        </div>

        <MemberAvatar
          member={group}
          size={80}
          isLinked={false}
          circle
        />
      </Header>
    );
  }
}
