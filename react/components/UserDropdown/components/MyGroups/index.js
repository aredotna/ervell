import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import myGroupsFragment from 'react/components/UserDropdown/components/MyGroups/fragments/myGroups';

import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';
import Link from 'react/components/UserDropdown/components/Link';
import MyGroup from 'react/components/UserDropdown/components/MyGroups/components/MyGroup';
import Modal from 'react/components/UI/Modal';
import CreateGroup from 'react/components/CreateGroup';

const Header = styled(Link)`
  position: relative;

  // Left-facing Caret
  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    right: 1em;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 0.5em solid transparent;
    border-right: 0.5em solid ${x => x.theme.colors.gray.base};
    border-bottom: 0.5em solid transparent;
    border-left: 0.5em solid transparent;
    pointer-events: none;
  }

  &:after {
    border-right-color: white;
    margin-right: -1px;
  }

  ${x => x.mode === 'open' && `
    // Down-facing Caret
    &:before,
    &:after {
      border-top: 0.5em solid ${x.theme.colors.gray.base};
      border-right: 0.5em solid transparent;
      border-bottom: 0;
      border-left: 0.5em solid transparent;
    }

    &:after {
      border-top-color: white;
      margin-top: -1px;
      margin-right: 0;
    }
  `}
`;

export default class MyGroups extends Component {
  static propTypes = {
    me: propType(myGroupsFragment).isRequired,
  }

  state = {
    mode: 'open',
  }

  toggle = (e) => {
    e.preventDefault();

    this.setState(({ mode: prevMode }) => ({
      mode: prevMode === 'open' ? 'collapsed' : 'open',
    }));
  }

  openCreateGroup = (e) => {
    e.preventDefault();

    const modal = new Modal(CreateGroup);
    modal.open();
  }

  render() {
    const { mode } = this.state;
    const { me: { groups } } = this.props;

    return (
      <div>
        <Header onClick={this.toggle} mode={mode}>
          Groups
        </Header>

        {mode === 'open' &&
          <div>
            {groups.length === 0 &&
              <Text f={1} my="1rem" px="1rem">
                Groups are a new way to collaborate on Are.na
              </Text>
            }

            {groups.map(group => (
              <MyGroup key={`${group.__typename}_${group.id}`} group={group} />
            ))}

            <GenericButton display="block" f={1} my={5} mx="1rem" onClick={this.openCreateGroup}>
              + New group
            </GenericButton>
          </div>
        }
      </div>
    );
  }
}
