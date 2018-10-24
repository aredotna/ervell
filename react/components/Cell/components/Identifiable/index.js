import React, { Component } from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';
import { propType } from 'graphql-anywhere';

import constants from 'react/styles/constants';

import identifiableCellFragment from 'react/components/Cell/components/Identifiable/fragments/identifiableCell';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Badge from 'react/components/UI/Badge';
import Truncate from 'react/components/UI/Truncate';
import MemberAvatar from 'react/components/MemberAvatar';
import { mixin as dividerButtonMixin } from 'react/components/UI/Buttons/components/DividerButton';
import FollowButton from 'react/components/FollowButton';

const IdentifiableFollowButton = styled(FollowButton)`
  ${dividerButtonMixin}
`;

const Wrap = styled(Box).attrs({
})`
  display: flex;
  flex: 0.33;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;

const Container = styled.a.attrs({
  px: 4,
  mb: 8,
})`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  width: ${x => x.theme.constantValues.blockWidth};
  height: ${x => x.theme.constantValues.blockWidth};
  border: 2px solid ${x => x.theme.colors.gray.regular};
  border-radius: ${constants.radii.subtle};
  ${space}

  &:hover {
    border-color: black;
  }

  ${x => x.__typename === 'Group' && `
    background-color: ${x.theme.colors.gray.hint};
  `}
`;

export default class Indentifiable extends Component {
  static propTypes = {
    identifiable: propType(identifiableCellFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  onMouseEnter = () => {
    this.setState({ mode: 'hover' });
  }

  onMouseLeave = () => {
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;
    const { identifiable } = this.props;

    return (
      <Container
        href={identifiable.href}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        mode={mode}
        __typename={identifiable.__typename}
      >
        <Wrap>
          <Text f={5} fontWeight="bold" textAlign="center">
            <Truncate length={40}>
              {identifiable.name}
            </Truncate>

            {identifiable.__typename === 'Group' &&
              <Badge f={0} ml={4} icon={{ private: 'Lock' }[identifiable.visibility]}>
                Group
              </Badge>
            }
          </Text>
        </Wrap>

        <MemberAvatar
          size={140}
          member={identifiable}
          circle={identifiable.__typename === 'Group'}
        />

        <Wrap>
          <IdentifiableFollowButton
            f={4}
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          />
        </Wrap>
      </Container>
    );
  }
}
