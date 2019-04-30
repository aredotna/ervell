import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import selectableChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import SelectableChannel from 'extension/src/components/SelectableChannel';

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
  align-items: stretch;
  justify-content: space-between;
`;

class ChannelList extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    channels: PropTypes.arrayOf(propType(selectableChannelFragment)).isRequired,
    loading: PropTypes.bool.isRequired,
    header: PropTypes.string.isRequired,
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/blocks');
  }

  render() {
    const { channels, loading, header } = this.props;

    return (
      <Box mt={7}>
        <Text f={2}>{header}</Text>
        <ChannelContainer>
          {loading &&
            <Text f={4} fontWeight="bold">
              ...
            </Text>
          }
          {channels && channels.map(channel => (
            <SelectableChannel channel={channel} key={channel.id} onClick={this.goBack} />
          ))}
        </ChannelContainer>
      </Box>
    );
  }
}

export default withRouter(ChannelList);
