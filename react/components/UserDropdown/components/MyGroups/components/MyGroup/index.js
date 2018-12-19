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

const Avatar = styled(MemberAvatar)`
  opacity: 0.65;
  ${x => x.mode === 'hover' && 'opacity: 0.7;'};
`;

const GroupName = styled(Text).attrs({
  f: 2,
  px: 5,
  fontWeight: 'bold',
})`
  ${x => x.mode === 'hover' && `
    color: ${x.theme.colors.black};
  `}
`;

export default class MyGroup extends Component {
  static propTypes = {
    group: propType(myGroupFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  onMouseOver = () => {
    this.setState({ mode: 'hover' });
  }

  onMouseOut = () => {
    this.setState({ mode: 'resting' });
  }

  render() {
    const { group } = this.props;
    const { mode } = this.state;

    return (
      <Container
        href={group.href}
        py="0.5rem"
        px="1rem"
        display="flex"
        alignItems="center"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onFocus={this.onMouseOver}
        onBlur={this.onMouseOut}
      >
        <Box display="flex" alignItems="center">
          <Avatar member={group} size={20} isLinked={false} circle mode={mode} />
        </Box>

        <GroupName mode={mode}>
          {group.name}
        </GroupName>

        {group.visibility === 'private' &&
          <Icons name="Lock" color="gray.semiBold" size={4} />
        }
      </Container>
    );
  }
}
