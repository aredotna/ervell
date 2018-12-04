import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import mapErrors from 'react/util/mapErrors';

import createChannelMutation from 'react/components/NewChannelForm/mutations/createChannel';

import Text from 'react/components/UI/Text';
import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea, Label, LabelledCheckbox, LabelledInput } from 'react/components/UI/Inputs';
import ChannelVisibilityPulldown from 'react/components/ChannelVisibilityPulldown';
import NewChannelGroups from 'react/components/NewChannelForm/components/NewChannelGroups';

class NewChannelForm extends Component {
  static propTypes = {
    createChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    title: '',
    description: '',
    visibility: 'CLOSED',
    group_id: null,
    visit_channel: true,
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

  handleCheckbox = fieldName => ({ target: { checked } }) =>
    this.setState({ [fieldName]: checked })
      type='checkbox'

  handleVisitChannel = this.handleCheckbox('visit_channel')
  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')

  handleVisibility = visibility =>
    this.setState({ visibility });

  handleAuthor = (group_id) => {
    if (group_id === 0) return;
    this.setState({ group_id });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { createChannel, onClose } = this.props;
    const {
      title, description, visibility, group_id, visit_channel,
    } = this.state;

    const variables = {
      title, description, visibility, group_id,
    };

    this.setState({ mode: 'creating' });

    return createChannel({ variables })
      .then(({ data: { create_channel: { channel } } }) => {
        if (visit_channel) {
          window.location.href = channel.href;
          this.setState({ mode: 'redirecting' });
          return;
        }

        this.setState({ mode: 'success' });
        setTimeout(() => onClose(), 500);
      })
      .catch((err) => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  render() {
    const {
      mode,
      title,
      description,
      visibility,
      visit_channel,
      errorMessage,
      attributeErrors,
    } = this.state;

    // If the state of the form is not resting or error,
    // disable the button.
    const isDisabled = !(mode === 'resting' || mode === 'error');

    return (
      <TitledDialog
        title="New channel"
        label={{
          resting: 'Create channel',
          creating: 'Creating...',
          redirecting: 'Redirecting...',
          success: 'Created',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
        disabled={isDisabled}
      >
        <div>
          <LabelledInput mt={6} mb={7}>
            <Label>
              Name
            </Label>

            <Input
              f={7}
              color={`channel.${visibility.toLowerCase()}`}
              placeholder="Type channel name"
              borderless
              autoFocus
              required
              value={title}
              onChange={this.handleTitle}
              errorMessage={attributeErrors.title}
            />
          </LabelledInput>

          <LabelledInput my={6} alignItems="start">
            <Label>
              Author
            </Label>

            <NewChannelGroups
              onChange={this.handleAuthor}
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

          <LabelledInput my={6} alignItems="start">
            <Label>
              Privacy
            </Label>

            <div>
              <ChannelVisibilityPulldown
                value={visibility.toUpperCase()}
                onChange={this.handleVisibility}
              />
            </div>
          </LabelledInput>

          <LabelledInput mt={6} mb={8}>
            <Label />
            <LabelledCheckbox
              onChange={this.handleVisitChannel}
              checked={visit_channel}
            >
              Visit channel
            </LabelledCheckbox>
          </LabelledInput>

          {mode === 'error' &&
            <Text mb={6} f={2} color="state.alert" textAlign="center">
              {errorMessage}
            </Text>
          }
        </div>
      </TitledDialog>
    );
  }
}

export default graphql(createChannelMutation, {
  name: 'createChannel',
})(NewChannelForm);
