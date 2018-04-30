import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { some } from 'underscore';
import styled from 'styled-components';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';
import manageChannelQuery from 'react/components/ManageChannel/queries/manageChannel';
import updateChannelMutation from 'react/components/ManageChannel/mutations/updateChannel';

import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea, Select } from 'react/components/UI/GenericInput';

const Caption = styled.div`
  margin-top: 1em;
  font-size: 0.75rem;
  text-align: center;
`;

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
    visibility: '',
  }

  componentWillReceiveProps({ data: { channel: { title, description, visibility } } }) {
    this.setState({ title, description, visibility });
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
  handleVisbility = this.handleInput('visibility')

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateChannel, data: { channel: { id } },
    } = this.props;

    const {
      mode, title, description, visibility,
    } = this.state;

    switch (mode) {
      case 'resting':
        return onClose();
      default:
        this.setState({ mode: 'submitting' });

        return updateChannel({
          variables: {
            id, title, description, visibility,
          },
        })
          .then(({ data: { update_channel: { channel: { href } } } }) => {
            onClose();
            // Slug may have changed so redirect
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
      mode, title, description, visibility,
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

        <TitledDialog.Section>
          <TitledDialog.Label>
            Privacy
          </TitledDialog.Label>

          <Select
            name="visibility"
            value={visibility.toUpperCase()}
            onChange={this.handleVisbility}
          >
            <option value="PUBLIC">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="PRIVATE">Private</option>
          </Select>

          <Caption>
            {{
              PUBLIC: 'Everyone can view the channel and anyone logged-in can add to it.',
              CLOSED: 'Everyone can view the channel but only you and your collaborators can add to it.',
              PRIVATE: 'Only you and your collaborators can view and add to the channel.',
            }[visibility.toUpperCase()]}
          </Caption>
        </TitledDialog.Section>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(ManageChannel);
