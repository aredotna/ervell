import React from 'react';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import Connectable from 'react/components/Blokk/components/Connectable';
import GroupAvatar from 'react/components/GroupAvatar';
import GroupBadge from 'react/components/UI/GroupBadge';

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid ${x => x.theme.colors.gray.medium};
  background-color: ${x => x.theme.colors.gray.hint};

  &:hover {
    border: 2px solid ${x => x.theme.colors.gray.semiBold};
  }
`;

const Groupname = styled(Text)`
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  height: 25%;
`;

export default class Group extends Connectable {
  render() {
    const { group } = this.props;

    return (
      <Inner>
        <Groupname pt={6} mx={3} my={6} f={6} textAlign="center">
          {group.name}
          <GroupBadge group={group} />
        </Groupname>
        <GroupAvatar group={group} size={120} />
        <Spacer />
      </Inner>
    );
  }
}
