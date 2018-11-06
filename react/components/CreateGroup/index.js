import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { without } from 'underscore';

import mapErrors from 'react/util/mapErrors';
import currentUserService from 'react/util/currentUserService';

import Box from 'react/components/UI/Box';
import TitledDialog from 'react/components/UI/TitledDialog';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import CollaboratorSearch from 'react/components/CollaboratorSearch';
import PendingGroupUsers from 'react/components/CreateGroup/components/PendingGroupUsers';
import HelpTip from 'react/components/CreateGroup/components/HelpTip';
import { LabelledInput, Label, Input, Textarea } from 'react/components/UI/Inputs';

import createGroupMutation from 'react/components/CreateGroup/mutations/createGroup';
import addChannelMemberMutation from 'react/components/CreateGroup/mutations/addChannelMember';
import addGroupUsersMutation from 'react/components/CreateGroup/mutations/addGroupUsers';
import inviteUserMutation from 'react/components/CreateGroup/mutations/inviteUser';

class CreateGroup extends Component {
  static propTypes = {
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired,
    addChannelMember: PropTypes.func.isRequired,
    addGroupUsers: PropTypes.func.isRequired,
    inviteUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    channel_id: null,
  }

  state = {
    mode: 'resting',
    name: '',
    description: '',
    user_ids: [currentUserService().id],
    errorMessage: null,
    attributeErrors: {},
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) =>
    this.setState(prevState => ({
      [fieldName]: fieldValue,
      attributeErrors: {
        ...prevState.attributeErrors,
        [fieldName]: null, // Clear specific error once typing begins
      },
    }));

  handleName = this.handleInput('name')
  handleDescription = this.handleInput('description')

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      channel_id, onClose, createGroup, addChannelMember, addGroupUsers,
    } = this.props;

    const { name, description, user_ids } = this.state;

    this.setState({ mode: 'submitting' });

    // Create the group
    return createGroup({ variables: { name, description } })
      // Add users to the Group
      .then(({ data: { create_group: { group: { id, href } } } }) => {
        if (user_ids.length === 0) return Promise.resolve();

        return addGroupUsers({
          variables: {
            id,
            user_ids,
          },
        })
          .then(() => {
            // If there's no channel context then redirect to the new group
            if (!channel_id) {
              window.location = href;
              return Promise.resolve();
            }

            // Pass along the group id
            return id;
          });
      })

      // Add the group to the channel if a `channel_id` is present
      .then((member_id) => {
        if (!channel_id) return Promise.resolve();

        return addChannelMember({
          variables: {
            channel_id,
            member_id,
            member_type: 'GROUP',
          },
        });
      })

      // Close it out
      .then(onClose)
      .catch((err) => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  addUserId = user_id =>
    new Promise(resolve =>
      this.setState((prevState) => {
        const user_ids = [...new Set([...prevState.user_ids, user_id])];
        return { user_ids };
      }, resolve));

  handleAddUser = ({ member_id: user_id }) =>
    this.addUserId(user_id);

  handleInviteUser = ({ email }) => {
    const { inviteUser } = this.props;

    return inviteUser({ variables: { email } })
      .then(({ data: { invite_users: { users } } }) => {
        const { id: user_id } = users[0];
        return this.addUserId(user_id);
      });
  }

  removeUserId = id =>
    this.setState(({ user_ids }) => ({
      user_ids: without(user_ids, id),
    }));

  render() {
    const {
      mode,
      name,
      description,
      user_ids,
      errorMessage,
      attributeErrors,
    } = this.state;

    const { channel_id } = this.props;

    return (
      <TitledDialog
        title="New group"
        label={{
          resting: 'Create Group',
          submitting: 'Saving...',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <div>
          {mode === 'error' &&
            <ErrorAlert>
              {errorMessage}
            </ErrorAlert>
          }

          <LabelledInput>
            <Label>
              Name
            </Label>

            <Input
              name="name"
              placeholder="enter group name"
              onChange={this.handleName}
              autoFocus
              required
              value={name}
            />
          </LabelledInput>

          <LabelledInput my={6} alignItems="start">
            <Label>
              Description
            </Label>

            <Textarea
              placeholder="Describe your channel here"
              rows={4}
              value={description}
              onChange={this.handleDescription}
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Invite
            </Label>

            <div>
              <CollaboratorSearch
                types={['USER']}
                onAdd={this.handleAddUser}
                onInvite={this.handleInviteUser}
                channel_id={channel_id}
              />

              {user_ids.length > 0 &&
                <Box my={6}>
                  <PendingGroupUsers
                    user_ids={user_ids}
                    onRemove={this.removeUserId}
                  />
                </Box>
              }
            </div>
          </LabelledInput>

          <HelpTip />
        </div>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(createGroupMutation, { name: 'createGroup' }),
  graphql(addChannelMemberMutation, { name: 'addChannelMember' }),
  graphql(addGroupUsersMutation, { name: 'addGroupUsers' }),
  graphql(inviteUserMutation, { name: 'inviteUser' }),
)(CreateGroup);
