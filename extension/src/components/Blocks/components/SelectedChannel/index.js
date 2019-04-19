import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import selectedChannelFragment from 'extension/src/components/Blocks/components/SelectedChannel/fragments/selectedChannel';
import selectedChannelQuery from 'extension/src/components/Blocks/components/SelectedChannel/queries/selectedChannel';

import Icons from 'react/components/UI/Icons';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

// import withExtensionContext from 'extension/src/components/Extension/withExtension';

const ChannelContainer = styled(Box).attrs({
  p: 6,
  mt: 1,
  mb: 4,
  mx: -4,
})`
  border-top: 1px solid ${x => x.theme.colors.gray.light};
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

class SelectedChannel extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      recent_channels: PropTypes.arrayOf(propType(selectedChannelFragment)),
    }).isRequired,
  }

  selectChannel = () => {
    const { history } = this.props;
    history.push('/channels');
  }

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <Text f={2}>Connect to:</Text>
        <ChannelContainer onClick={this.selectChannel}>
          {data.loading &&
            <Text f={4} fontWeight="bold">
              ...
            </Text>
          }
          {!data.loading && !data.error && data.me && data.me.recent_channels[0] &&
            <Text f={4} fontWeight="bold" color={`channel.${data.me.recent_channels[0].visibility}`}>
              {data.me.recent_channels[0].title}
            </Text>
          }
          <Icons name="RightCaret" size="1rem" color="gray.semiLight" />
        </ChannelContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(graphql(selectedChannelQuery)(SelectedChannel));
