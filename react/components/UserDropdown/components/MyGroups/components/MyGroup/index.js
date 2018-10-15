import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import myGroupFragment from 'react/components/UserDropdown/components/MyGroups/components/MyGroup/fragments/myGroup';

import Box, { mixin as boxMixin } from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Icons from 'react/components/UI/Icons';
import MemberAvatar from 'react/components/MemberAvatar';

const Container = styled.a`
  ${boxMixin}
  text-decoration: none;
`;

export default class MyGroup extends Component {
  static propTypes = {
    group: propType(myGroupFragment).isRequired,
  }

  render() {
    const { group } = this.props;

    return (
      <Container href={group.href} py="0.375rem" px="1rem" display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <MemberAvatar member={group} size={20} isLinked={false} circle />
        </Box>

        <Text f={2} px={5} fontWeight="bold">
          {group.name}
        </Text>

        {group.visibility === 'private' &&
          <Icons name="Lock" color="gray.semiBold" size={4} />
        }
      </Container>
    );
  }
}
