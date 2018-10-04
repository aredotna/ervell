import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileGroupUserListFragment from 'react/components/ProfileMetadata/components/ProfileGroupUserList/fragments/profileGroupUserList';

import Pocket from 'react/components/UI/Pocket';
import LinksList from 'react/components/LinksList';
import { Expandable } from 'react/components/UI/ExpandableSet';

export default class ProfileGroupUserList extends Component {
  static propTypes = {
    identifiable: propType(profileGroupUserListFragment).isRequired,
  }

  render() {
    const { identifiable: { users } } = this.props;

    return (
      <Pocket title="Members">
        <Expandable>
          <LinksList links={users} />
        </Expandable>
      </Pocket>
    );
  }
}
