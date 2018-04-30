import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { some } from 'underscore';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';
import manageChannelQuery from 'react/components/ManageChannel/queries/manageChannel';
import updateChannelMutation from 'react/components/ManageChannel/mutations/updateChannel';

import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea } from 'react/components/UI/GenericInput';

class ManageChannel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      channel: propType(manageChannelFragment),
    }).isRequired,
    updateChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    title: '',
    description: '',
  }

  componentWillReceiveProps({ data: { channel: { title, description } } }) {
    this.setState({ title, description });
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const { data: { channel: originalChannel } } = this.props;

    const isEdited = some(originalChannel, (originalValue, key) =>
      fieldName === key && originalValue !== fieldValue);

    this.setState({
      mode: isEdited ? 'submit' : 'resting',
      [fieldName]: fieldValue,
    });
  }

  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateChannel, data: { channel: { id } },
    } = this.props;

    const {
      mode, title, description,
    } = this.state;

    switch (mode) {
      case 'resting':
        return onClose();
      default:
        this.setState({ mode: 'submitting' });

        return updateChannel({
          variables: { id, title, description },
        })
          .then(({ data: { update_channel: { channel: { href } } } }) => {
            onClose();
            window.location = href;
          })
          .catch((err) => {
            console.error(err);
            // TODO: Better error handling
            this.setState({ mode: 'error' });
          });
    }
  }

  render() {
    const { data: { loading } } = this.props;
    const {
      mode, title, description,
    } = this.state;

    if (loading) return <div />;

    return (
      <TitledDialog
        title="Edit channel"
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
            Name
          </TitledDialog.Label>

          <Input
            name="title"
            value={title}
            onChange={this.handleTitle}
          />
        </TitledDialog.Section>

        <TitledDialog.Section>
          <TitledDialog.Label>
            Description
          </TitledDialog.Label>

          <Textarea
            name="description"
            value={description}
            onChange={this.handleDescription}
            placeholder="describe your channel here"
            rows="3"
          />
        </TitledDialog.Section>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(ManageChannel);
