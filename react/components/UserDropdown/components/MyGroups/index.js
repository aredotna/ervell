import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import myGroupsFragment from 'react/components/UserDropdown/components/MyGroups/fragments/myGroups';

import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';
import Link from 'react/components/UserDropdown/components/Link';
import MyGroup from 'react/components/UserDropdown/components/MyGroups/components/MyGroup';
import Modal from 'react/components/UI/Modal';
import CreateGroup from 'react/components/CreateGroup';

export default class MyGroups extends Component {
  static propTypes = {
    me: propType(myGroupsFragment).isRequired,
  }

  openCreateGroup = (e) => {
    e.preventDefault();

    const modal = new Modal(CreateGroup);
    modal.open();
  }

  render() {
    const { me: { groups } } = this.props;

    return (
      <div>
        <Link>Groups</Link>

        {groups.length === 0 &&
          <Text f={1} my={4} px="1rem">
            Groups are a new way to collaborate on Are.na
          </Text>
        }

        {groups.map(group => (
          <MyGroup key={`${group.__typename}_${group.id}`} group={group} />
        ))}

        <GenericButton display="block" f={1} mt={6} mx="1rem" onClick={this.openCreateGroup}>
          + New group
        </GenericButton>
      </div>
    );
  }
}
