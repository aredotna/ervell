import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import ConnectionSelectionList from 'react/components/ConnectionSelectionList';

import createConnectionMutation from 'react/components/Connect/mutations/createConnection';
import removeConnectionMutation from 'react/components/Connect/mutations/removeConnection';

import channelMetadataQuery from 'react/components/ChannelMetadata/queries/channelMetadata';

class ConnectionSelection extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['BLOCK', 'CHANNEL']).isRequired,
    createConnection: PropTypes.func.isRequired,
    removeConnection: PropTypes.func.isRequired,
    outline: PropTypes.bool,
  }

  static defaultProps = {
    outline: true,
  }

  handleConnectionSelection = (isSelected, channelId) => {
    const {
      id,
      type,
      createConnection,
      removeConnection,
    } = this.props;

    const refetchQueries = [
      type === 'CHANNEL' && {
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
    const { id, type, ...rest } = this.props;

    return (
      <ConnectionSelectionList
        id={id}
        type={type}
        onConnectionSelection={this.handleConnectionSelection}
        {...rest}
      />
    );
  }
}

export default compose(
  graphql(createConnectionMutation, { name: 'createConnection' }),
  graphql(removeConnectionMutation, { name: 'removeConnection' }),
)(ConnectionSelection);
