import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import Styles from 'react/styles';

import createPrivateChannelMutation from 'react/components/Connect/components/ConnectionSelection/components/CreatePrivateChannelButton/mutations/createPrivateChannel';

import { inputPadding } from 'react/components/UI/GenericInput';
import ColoredChannelSpan from 'react/components/UI/ColoredChannelSpan';

const Button = styled.a.attrs({
  role: 'button',
  tabIndex: 0,
})`
  position: relative;
  display: block;
  margin-top: -1px;
  padding: ${inputPadding};
  text-align: center;
  font-weight: normal !important;
  border: 1px solid ${Styles.Colors.gray.regular};
  background-color: ${Styles.Colors.gray.hint};
  line-height: 1;

  &:hover {
    z-index: 1;
    border: 1px solid ${Styles.Colors.gray.semiBold};
  }
`;

class CreatePrivateChannelButton extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    createPrivateChannel: PropTypes.func.isRequired,
    onConnectionCreation: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  createPrivateChannel = async () => {
    const {
      title,
      createPrivateChannel,
      onConnectionCreation,
    } = this.props;

    this.setState({ mode: 'creating' });

    try {
      const {
        data: {
          create_channel: {
            channel: {
              id: newChannelId,
            },
          },
        },
      } = await createPrivateChannel({
        variables: { title },
      });

      this.setState({ mode: 'resting' });

      return onConnectionCreation(true, newChannelId);
    } catch (err) {
      console.error(err);

      this.setState({ mode: 'error' });

      return null;
    }
  }

  render() {
    const { mode } = this.state;
    const { title } = this.props;

    return (
      <Button onClick={this.createPrivateChannel}>
        <ColoredChannelSpan visibility="private">
          {{
            resting: `+ New private channel “${title}”`,
            creating: `Creating ${title}...`,
            error: 'An error occurred',
          }[mode]}
        </ColoredChannelSpan>
      </Button>
    );
  }
}

export default graphql(createPrivateChannelMutation, {
  name: 'createPrivateChannel',
})(CreatePrivateChannelButton);
