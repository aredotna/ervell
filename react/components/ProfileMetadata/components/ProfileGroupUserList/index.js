import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import profileGroupUserListFragment from 'react/components/ProfileMetadata/components/ProfileGroupUserList/fragments/profileGroupUserList';

import Pocket from 'react/components/UI/Pocket';
import LinksList from 'react/components/LinksList';
import { Expandable } from 'react/components/UI/ExpandableSet';

import Modal from 'react/components/UI/Modal';
import ManageGroup from 'react/components/ManageGroup';

const Link = styled.a`
  display: block;
`;

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }
`;

export default class ProfileGroupUserList extends Component {
  static propTypes = {
    identifiable: propType(profileGroupUserListFragment).isRequired,
  }

  openManageGroupModal = (e) => {
    e.preventDefault();

    const { identifiable: { id } } = this.props;

    new Modal(ManageGroup, { id, initialSection: 'members' }).open();
  }

  render() {
    const { identifiable: { user, users, can } } = this.props;

    return (
      <Pocket title="Members">
        <Expandable>
          <LinksList links={[user, ...users]} />
        </Expandable>
        {can.manage_users &&
          <Actions>
            <Link onClick={this.openManageGroupModal} role="button" tabIndex={0}>
              {users.length ? 'Edit' : 'Add'} members
            </Link>
          </Actions>
        }
      </Pocket>
    );
  }
}
