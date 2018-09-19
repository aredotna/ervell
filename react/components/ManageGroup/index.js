import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { compose, graphql } from 'react-apollo';
import { some } from 'underscore';

import mapErrors from 'react/util/mapErrors';
import compactObject from 'react/util/compactObject';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';
import manageGroupQuery from 'react/components/ManageGroup/queries/manageGroup';
import manageCollaboratorsQuery from 'react/components/ManageCollaborators/queries/manageCollaborators';

import updateGroupMutation from 'react/components/ManageGroup/mutations/updateGroup';
import addGroupUserMutation from 'react/components/ManageGroup/mutations/addGroupUser';
import removeGroupUserMutation from 'react/components/ManageGroup/mutations/removeGroupUser';
import inviteGroupUserMutation from 'react/components/ManageGroup/mutations/inviteGroupUser';

import Box from 'react/components/UI/Box';
import Accordion from 'react/components/UI/Accordion';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import TitledDialog from 'react/components/UI/TitledDialog';
import CollaboratorSearch from 'react/components/CollaboratorSearch';
import ManagedMembers from 'react/components/ManagedMembers';
import DeleteGroup from 'react/components/ManageGroup/components/DeleteGroup';
import { LabelledInput, Label, Input, Textarea, ErrorMessage } from 'react/components/UI/Inputs';

class ManageGroup extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    name: null,
    description: null,
    attributeErrors: {},
    errorMessage: '',

  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const { data: { group: originalGroup } } = this.props;

    const isEdited = some(originalGroup, (originalValue, key) =>
      fieldName === key && originalValue !== fieldValue);

    this.setState({
      mode: isEdited ? 'submit' : 'resting',
      [fieldName]: fieldValue,
    });
  }

  handleName = this.handleInput('name')
  handleDescription = this.handleInput('description')

  handleSubmit = (e) => {
    e.preventDefault();

    const { id, updateGroup, onClose } = this.props;
    const { mode, name, description } = this.state;

    const variables = compactObject({ id, name, description });

    switch (mode) {
      case 'resting':
        return onClose();
      default:
        this.setState({ mode: 'submitting' });

        return updateGroup({ variables })
          .then(onClose)
          .catch((err) => {
            this.setState({
              mode: 'error',
              ...mapErrors(err),
            });
          });
    }
  }

  handleAddUser = ({ member_id: user_id }) => {
    const { addGroupUser, id, channel_id } = this.props;

    return addGroupUser({
      variables: { id, user_id },
      refetchQueries: [
        {
          query: manageCollaboratorsQuery,
          variables: {
            channel_id,
          },
        },
      ],
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

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <LoadingIndicator />;

    const {
      mode,
      attributeErrors,
      errorMessage,
    } = this.state;
    const { data: { group, group: { owner, memberships } } } = this.props;

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
        <Accordion label="Edit name and description">
          <LabelledInput>
            <Label>
                Name
            </Label>

            <Input
              name="name"
              placeholder="enter group name"
              onChange={this.handleName}
              defaultValue={group.name}
              disabled={!group.can.manage}
              errorMessage={attributeErrors.title}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Description
            </Label>

            <Textarea
              name="description"
              defaultValue={group.description}
              onChange={this.handleDescription}
              placeholder="describe your group here"
              rows="3"
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>
        </Accordion>

        <Accordion label="Add/edit members" mode="closed">
          <LabelledInput>
            <Label>
                Invite
            </Label>

            <CollaboratorSearch
              types={['USER']}
              onAdd={this.handleAddUser}
              onInvite={this.handleInviteUser}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Members
            </Label>

            <ManagedMembers
              owner={owner}
              memberships={memberships}
              onRemove={this.handleRemoveUser}
              confirmationWarning="Are you sure?"
              confirmationSelfWarning={`
                Removing yourself from ${group.name} means you will
                lose access to all channels ${group.name} is collaborating on.
                There is no way to undo this action, and only the group’s
                creator can re-add you.
              `}
            />
          </LabelledInput>
        </Accordion>

        <Accordion label="Delete group" mode="closed">
          <Box m={7}>
            <DeleteGroup group={group} />
          </Box>
        </Accordion>

        {mode === 'error' &&
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
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
