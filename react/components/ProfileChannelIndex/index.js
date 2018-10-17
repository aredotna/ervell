import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import constants from 'react/styles/constants';

import profileChannelIndexQuery from 'react/components/ProfileChannelIndex/queries/profileChannelIndex';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import CompactChannel from 'react/components/CompactChannel';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';

const Columns = styled.div`
  column-count: 2;
  column-gap: ${x => x.theme.space[9]};

  ${constants.media.small`
    column-count: 1;
  `}
`;

const Group = styled(Box).attrs({
  mb: 8,
})`
  break-inside: avoid;
`;

export default class ProfileChannelIndex extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { id } = this.props;

    return (
      <Query query={profileChannelIndexQuery} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <BlocksLoadingIndicator />;
          if (error) return error.message;

          const { user: { channels_index } } = data;

          return (
            <Columns>
              {channels_index.map(({ key, channels }) => (
                <Group key={key}>
                  <Text textAlign="center" f={4} mb={6} color="gray.medium">
                    {{ symbol: '~', digit: '0–9' }[key] || key}
                  </Text>

                  {channels.map(channel => (
                    <CompactChannel mb={4} key={channel.id} channel={channel} />
                  ))}
                </Group>
              ))}
            </Columns>
          );
        }}
      </Query>
    );
  }
}
