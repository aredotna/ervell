import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { compose, graphql } from 'react-apollo';
import { some } from 'underscore';

import mapErrors from 'react/util/mapErrors';
import compactObject from 'react/util/compactObject';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';
import manageGroupQuery from 'react/components/ManageGroup/queries/manageGroup';

import updateGroupMutation from 'react/components/ManageGroup/mutations/updateGroup';

import Box from 'react/components/UI/Box';
import Accordion from 'react/components/UI/Accordion';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import TitledDialog from 'react/components/UI/TitledDialog';
import DeleteGroup from 'react/components/ManageGroup/components/DeleteGroup';
import ManageUsers from 'react/components/ManageGroup/components/ManageUsers';
import { LabelledInput, Label, Input, Textarea, ErrorMessage } from 'react/components/UI/Inputs';

class ManageGroup extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      group: propType(manageGroupFragment),
    }).isRequired,
  }

  static defaultProps = {
    channel_id: null,
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

    if (mode === 'resting') {
      return onClose();
    }

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

  handleCancel = () =>
    this.props.onClose();

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <LoadingIndicator />;

    const { mode, attributeErrors, errorMessage } = this.state;
    const { channel_id, data: { group } } = this.props;

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
        <Accordion
          label={{
            true: 'Edit name and description',
            false: 'Name and description',
          }[group.can.manage]}
        >
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
              disabled={!group.can.manage}
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>
        </Accordion>

        {group.can.manage_users &&
          <Accordion label="Add/edit members" mode="closed">
            <ManageUsers channel_id={channel_id} group={group} />
          </Accordion>
        }

        {group.can.manage &&
          <Accordion label="Delete group" mode="closed">
            <Box m={7}>
              <DeleteGroup group={group} />
            </Box>
          </Accordion>
        }

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
)(ManageGroup);
