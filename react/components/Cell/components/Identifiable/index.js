import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import constants from 'react/styles/constants';

import identifiableCellFragment from 'react/components/Cell/components/Identifiable/fragments/identifiableCell';

import Text from 'react/components/UI/Text';
import Badge from 'react/components/UI/Badge';
import MemberAvatar from 'react/components/MemberAvatar';
import { mixin as dividerButtonMixin } from 'react/components/UI/Buttons/components/DividerButton';
import FollowButton from 'react/components/FollowButton';

const AVATAR_SIZE = 140;

const IdentifiableFollowButton = styled(FollowButton)`
  ${dividerButtonMixin}
  width: ${AVATAR_SIZE}px;
`;

const Container = styled.a`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  width: ${x => x.theme.constantValues.blockWidth};
  height: ${x => x.theme.constantValues.blockWidth};
  padding: ${x => `0 ${x.theme.space[4]}`};
  margin: ${x => x.theme.space[8]};
  border: 2px solid ${x => x.theme.colors.gray.regular};
  border-radius: ${constants.radii.subtle};

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
        <Text f={5} pt={7} fontWeight="bold" textAlign="center">
          {identifiable.name}

          {identifiable.__typename === 'Group' &&
            <Badge f={0} ml={4} icon={{ private: 'Lock' }[identifiable.visibility]}>
              Group
            </Badge>
          }
        </Text>

        <MemberAvatar
          size={AVATAR_SIZE}
          member={identifiable}
          circle={identifiable.__typename === 'Group'}
        />

        <IdentifiableFollowButton
          f={4}
          mr={2}
          id={identifiable.id}
          type={identifiable.__typename.toUpperCase()}
        />
      </Container>
    );
  }
}
