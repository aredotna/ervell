import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { compose, graphql } from 'react-apollo';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';
import manageGroupQuery from 'react/components/ManageGroup/queries/manageGroup';
import collaboratorsListQuery from 'react/components/CollaboratorsList/queries/collaboratorsList';

import updateGroupMutation from 'react/components/ManageGroup/mutations/updateGroup';
import addGroupUserMutation from 'react/components/ManageGroup/mutations/addGroupUser';
import removeGroupUserMutation from 'react/components/ManageGroup/mutations/removeGroupUser';
import inviteGroupUserMutation from 'react/components/ManageGroup/mutations/inviteGroupUser';
import deleteGroupMutation from 'react/components/ManageGroup/mutations/deleteGroup';

import TitledDialog from 'react/components/UI/TitledDialog';
import CollaboratorSearch from 'react/components/CollaboratorSearch';
import ManagedMembers from 'react/components/ManagedMembers';
import Button from 'react/components/ManageGroup/components/Button';
import DeleteButton from 'react/components/ManageGroup/components/DeleteButton';
import DeleteConfirmation from 'react/components/ManageGroup/components/DeleteConfirmation';

class ManageGroup extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClose: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    addGroupUser: PropTypes.func.isRequired,
    removeGroupUser: PropTypes.func.isRequired,
    inviteGroupUser: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
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
      onClose, updateGroup, deleteGroup, id, channel_id,
    } = this.props;

    const { mode, name } = this.state;

    switch (mode) {
      case 'resting':
        return onClose();
      case 'delete':
        this.setState({ mode: 'deleting' });

        return deleteGroup({
          variables: { id },
          refetchQueries: [
            {
              query: collaboratorsListQuery,
              variables: {
                channel_id,
              },
            },
          ],
        })
          .then(onClose)
          .catch((err) => {
            console.error(err);
            // TODO: Better error handling
            this.setState({ mode: 'error' });
          });
      default:
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

  handleCancel = () =>
    this.props.onClose();

  handleDeleteClick = () =>
    this.setState({ mode: 'delete' });

  renderDialog() {
    const { mode, name } = this.state;
    const { data: { group, group: { users } } } = this.props;

    switch (mode) {
      case 'delete':
      case 'deleting':
        return (
          <DeleteConfirmation name={group.name} />
        );
      default:
        return (
          <div>
            {mode !== 'resting' &&
              <Button onClick={this.handleCancel}>
                Cancel
              </Button>
            }

            {mode === 'resting' &&
              <DeleteButton onClick={this.handleDeleteClick}>
                Delete
              </DeleteButton>
            }

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
          </div>
        );
    }
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { mode } = this.state;
    const { data: { group } } = this.props;

    return (
      <TitledDialog
        title={group.name}
        label={{
          resting: 'Done',
          submit: 'Save',
          submitting: 'Saving...',
          error: 'Error',
          delete: 'Delete',
          deleting: 'Deleting...',
        }[mode]}
        onDone={this.handleSubmit}
      >
        {this.renderDialog()}
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
  graphql(deleteGroupMutation, { name: 'deleteGroup' }),
)(ManageGroup);
