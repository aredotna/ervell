import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { some } from 'underscore';
import styled from 'styled-components';

import mapErrors from 'react/util/mapErrors';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';
import manageChannelQuery from 'react/components/ManageChannel/queries/manageChannel';
import updateChannelMutation from 'react/components/ManageChannel/mutations/updateChannel';

import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import TitledDialog from 'react/components/UI/TitledDialog';
import { LabelledInput, Label, Input, Textarea, ErrorMessage } from 'react/components/UI/Inputs';
import ChannelVisibilityPulldown from 'react/components/ChannelVisibilityPulldown';
import ExportChannel from 'react/components/ManageChannel/components/ExportChannel';
import DeleteChannel from 'react/components/ManageChannel/components/DeleteChannel';
import TransferChannel from 'react/components/ManageChannel/components/TransferChannel';

const Container = styled.div`
  width: 100%;
  margin: 0 auto 2em auto;
`;

class ManageChannel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(manageChannelFragment),
    }).isRequired,
    updateChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(nextProps) {
    const { data: { loading } } = nextProps;
    if (loading) return null;

    const { data: { channel: { title, description, visibility } } } = nextProps;
    return {
      title,
      description,
      visibility: visibility.toUpperCase(),
    };
  }

  state = {
    mode: 'resting',
    title: '',
    description: '',
    visibility: '',
    attributeErrors: {},
    errorMessage: '',
  };

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
  handleVisbility = value =>
    this.handleInput('visibility')({ target: { value } });

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateChannel, data: { channel: { id } },
    } = this.props;

    const {
      mode, title, description, visibility,
    } = this.state;

    if (mode === 'resting') return onClose();

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
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  render() {
    const { data: { loading } } = this.props;
    const {
      mode,
      title,
      description,
      visibility,
      attributeErrors,
      errorMessage,
    } = this.state;

    if (loading) return <LoadingIndicator />;

    const { data: { channel } } = this.props;

    return (
      <TitledDialog
        title="Edit channel"
        label={{
          resting: 'Done',
          submit: 'Save',
          submitting: 'Saving...',
          deleting: 'Deleting...',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <Container>
          <LabelledInput>
            <Label>Name</Label>

            <Input
              name="title"
              value={title}
              onChange={this.handleTitle}
              errorMessage={attributeErrors.title}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Description
            </Label>

            <Textarea
              name="description"
              value={description || ''}
              onChange={this.handleDescription}
              placeholder="describe your channel here"
              rows="3"
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Privacy
            </Label>

            <ChannelVisibilityPulldown
              name="visibility"
              value={visibility.toUpperCase()}
              onChange={this.handleVisbility}
            />
          </LabelledInput>

          {channel.can.export &&
            <LabelledInput>
              <Label>
                Export
              </Label>

              <ExportChannel id={channel.id} />
            </LabelledInput>
          }

          {channel.can.transfer &&
            <LabelledInput>
              <Label>
                Transfer
              </Label>

              <TransferChannel channel={channel} />
            </LabelledInput>
          }

          {channel.can.destroy &&
            <LabelledInput>
              <Label>
                Delete
              </Label>

              <DeleteChannel id={channel.id} />
            </LabelledInput>
          }

          {mode === 'error' &&
            <ErrorMessage my={5} align="center">
              {errorMessage}
            </ErrorMessage>
          }
        </Container>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(ManageChannel);
