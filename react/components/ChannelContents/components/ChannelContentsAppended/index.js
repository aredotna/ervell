import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import sharify from 'sharify';

import initPusherClient from 'react/util/initPusherClient';

import channelContentsSetQuery from 'react/components/ChannelContents/components/ChannelContentsSet/queries/channelContentsSet';

import ChannelContentsSet from 'react/components/ChannelContents/components/ChannelContentsSet';

const { data: { NODE_ENV } } = sharify;

const parsePayload = ({ id, base_class }) => ({
  id,
  type: base_class.toUpperCase(),
});

const normalizeSkeleton = skeleton =>
  [...new Map(skeleton.map(x => [JSON.stringify(x), x])).values()];

const ChannelContentsAppended = ({ id, pendingSkeleton, client }) => {
  const [pushedSkeleton, setPushedSkeleton] = useState([]);

  useEffect(() => {
    const socket = initPusherClient();
    const socketId = `channel-${NODE_ENV}-${id}`;
    const channel = socket.subscribe(socketId);

    channel.bind('created', (payload) => {
      setPushedSkeleton(prevSkeleton => normalizeSkeleton([
        parsePayload(payload),
        ...prevSkeleton,
      ]));
    });

    channel.bind('updated', (payload) => {
      client.query({
        query: channelContentsSetQuery,
        variables: { id, connectables: [parsePayload(payload)] },
        fetchPolicy: 'network-only',
      }).catch(console.error.bind(console));
    });

    return () => {
      socket.unsubscribe(socketId);
    };
  }, [id]);

  const normalizedSkeleton = normalizeSkeleton([
    ...pushedSkeleton,
    ...pendingSkeleton,
  ]);

  return normalizedSkeleton.map(skeleton => (
    <ChannelContentsSet
      key={JSON.stringify(skeleton)}
      id={id}
      skeleton={[skeleton]}
    />
  ));
};

ChannelContentsAppended.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  pendingSkeleton: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(ChannelContentsAppended);
