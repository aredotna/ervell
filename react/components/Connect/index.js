import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';

import GenericButton from 'react/components/UI/GenericButton';
import ConnectionSelection from 'react/components/Connect/components/ConnectionSelection';

import createConnectionMutation from 'react/components/Connect/mutations/createConnection';
import removeConnectionMutation from 'react/components/Connect/mutations/removeConnection';

import channelMetadataQuery from 'react/components/ChannelMetadata/queries/channelMetadata';
import { inputPadding } from 'react/components/UI/GenericInput';

import Styles from 'react/styles';

const Container = styled.div`
  position: relative;
`;

const Fieldset = styled.div`
  position: relative;
`;

const Close = styled.a.attrs({
  role: 'button',
})`
  position: absolute;
  top: 0;
  right: 100%;
  padding: ${inputPadding};
  text-align: center;
  font-weight: bold;
  font-size: ${Styles.Type.size.xs};
  line-height: 1;
  border: 2px solid transparent;

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${Styles.Type.size.lg};
  }
`;

// HACK: Inputs get rendered 2px taller than buttons
// given identical params. This allows us to match them up.
const ConnectPadding = styled.span`
  display: inline-block;
  padding: 1px 0;
`;

class Connect extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['BLOCK', 'CHANNEL']).isRequired,
    createConnection: PropTypes.func.isRequired,
    removeConnection: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openConnect = () => {
    this.setState({ mode: 'active' });
  }

  handleClose = () => {
    this.setState({ mode: 'resting' });
  }

  handleConnectionSelection = (isSelected, channelId) => {
    const {
      id,
      type,
      createConnection,
      removeConnection,
    } = this.props;

    // TODO: Possibly pass refetchQueries in as a param
    const refetchQueries = [
      {
        query: channelMetadataQuery,
        variables: { id },
      },
    ];

    if (isSelected) {
      return createConnection({
        refetchQueries,
        variables: {
          channel_ids: [channelId],
          connectable_id: id,
          connectable_type: type,
        },
      });
    }

    return removeConnection({
      refetchQueries,
      variables: {
        channel_id: channelId,
        connectable_id: id,
        connectable_type: type,
      },
    });
  }

  render() {
    const { mode } = this.state;
    const { id, type } = this.props;

    return (
      <Container>
        {mode === 'resting' &&
          <GenericButton onClick={this.openConnect} size="xs">
            <ConnectPadding>Connect &rarr;</ConnectPadding>
          </GenericButton>
        }

        {mode === 'active' &&
          <Fieldset>
            <Close onClick={this.handleClose}>
              &nbsp;
              <span>&times;</span>
            </Close>

            <ConnectionSelection
              id={id}
              type={type}
              onConnectionSelection={this.handleConnectionSelection}
            />
          </Fieldset>
        }
      </Container>
    );
  }
}

export default compose(
  graphql(createConnectionMutation, { name: 'createConnection' }),
  graphql(removeConnectionMutation, { name: 'removeConnection' }),
)(Connect);
