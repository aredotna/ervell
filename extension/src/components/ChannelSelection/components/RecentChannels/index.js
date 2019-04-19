import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import selectedChannelFragment from 'extension/src/components/Blocks/components/SelectedChannel/fragments/selectedChannel';
import recentChannelsQuery from 'extension/src/components/ChannelSelection/components/RecentChannels/queries/recentChannels';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import withExtensionContext from 'extension/src/components/Extension/withExtension';

const ChannelContainer = styled(Box).attrs({
  p: 6,
  mt: 1,
  mb: 4,
  mx: -4,
})`
  width: 100%;
  border-top: 1px solid ${x => x.theme.colors.gray.light};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

class RecentChannels extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      recent_channels: PropTypes.arrayOf(propType(selectedChannelFragment)),
    }).isRequired,
  }

  render() {
    const { data } = this.props;

    return (
      <Box mt={7}>
        <Text f={2}>Recent channels</Text>
        <ChannelContainer>
          {data.loading &&
            <Text f={4} fontWeight="bold">
              ...
            </Text>
          }
          {!data.loading && data.me && data.me.recent_channels.length > 0 && data.me.recent_channels.map(channel => (
            <Text
              f={4}
              fontWeight="bold"
              color={`channel.${channel.visibility}`}
              dangerouslySetInnerHTML={{ __html: channel.title }}
              py={4}
            />
          ))}
        </ChannelContainer>
      </Box>
    );
  }
}

export default withExtensionContext(graphql(recentChannelsQuery)(RecentChannels));
