import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { compose, graphql } from 'react-apollo';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';
import manageGroupQuery from 'react/components/ManageGroup/queries/manageGroup';
import updateGroupMutation from 'react/components/ManageGroup/mutations/updateGroup';
import addGroupUserMutation from 'react/components/ManageGroup/mutations/addGroupUser';
import removeGroupUserMutation from 'react/components/ManageGroup/mutations/removeGroupUser';
import inviteGroupUserMutation from 'react/components/ManageGroup/mutations/inviteGroupUser';

import TitledDialog from 'react/components/UI/TitledDialog';
import CollaboratorSearch from 'react/components/CollaboratorSearch';
import ManagedMembers from 'react/components/ManagedMembers';

class ManageGroup extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    addGroupUser: PropTypes.func.isRequired,
    removeGroupUser: PropTypes.func.isRequired,
    inviteGroupUser: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      group: propType(manageGroupFragment),
    }).isRequired,
  }

  state = {
    mode: 'resting',
    name: '',
  }

  componentWillReceiveProps({ data: { group: { name } } }) {
    this.setState({ name });
  }

  handleName = ({ target: { value: name } }) => {
    const { data: { group: { name: originalName } } } = this.props;
    const isEdited = name !== originalName;

    this.setState({
      name,
      mode: isEdited ? 'submit' : 'resting',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateGroup, id,
    } = this.props;

    const { mode, name } = this.state;

    if (mode === 'resting') return onClose();

    return updateGroup({
      variables: {
        id,
        name,
      },
    })
      .then(onClose)
      .catch((err) => {
        console.error(err);
        // TODO: Better error handling
        this.setState({ mode: 'error' });
      });
  }

  handleAddUser = ({ member_id: user_id }) => {
    const { addGroupUser, id } = this.props;

    return addGroupUser({
      variables: {
        id,
        user_id,
      },
    });
  }

  handleRemoveUser = ({ member_id: user_id }) => {
    const { removeGroupUser, id } = this.props;

    return removeGroupUser({
      variables: {
        id,
        user_id,
      },
    });
  }

  handleInviteUser = ({ email }) => {
    const { inviteGroupUser, id } = this.props;

    return inviteGroupUser({
      variables: {
        id,
        email,
      },
    });
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { mode, name } = this.state;
    const { data: { group, group: { users } } } = this.props;

    return (
      <TitledDialog
        title={group.name}
        label={{
          resting: 'Done',
          submit: 'Save',
          submitting: 'Saving...',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <TitledDialog.Section>
          <TitledDialog.Label>
            Group name
          </TitledDialog.Label>

          <input
            name="name"
            className="Input"
            placeholder="enter group name"
            onChange={this.handleName}
            value={name}
          />
        </TitledDialog.Section>

        <TitledDialog.Section>
          <TitledDialog.Label>
            Invite
          </TitledDialog.Label>

          <CollaboratorSearch
            types={['USER']}
            onAdd={this.handleAddUser}
            onInvite={this.handleInviteUser}
          />
        </TitledDialog.Section>

        {users.length > 0 &&
          <TitledDialog.Section>
            <TitledDialog.Label>
              {users.length} Collaborator{users.length === 1 ? '' : 's'}
            </TitledDialog.Label>

            <ManagedMembers
              members={users}
              onRemove={this.handleRemoveUser}
            />
          </TitledDialog.Section>
        }

      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageGroupQuery),
  graphql(updateGroupMutation, { name: 'updateGroup' }),
  graphql(addGroupUserMutation, { name: 'addGroupUser' }),
  graphql(removeGroupUserMutation, { name: 'removeGroupUser' }),
  graphql(inviteGroupUserMutation, { name: 'inviteGroupUser' }),
)(ManageGroup);
