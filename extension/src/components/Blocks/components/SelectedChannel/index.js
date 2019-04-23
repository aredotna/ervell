/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import withExtensionContext from 'extension/src/components/Extension/withExtension';

import selectedChannelQuery from 'extension/src/components/Blocks/components/SelectedChannel/queries/selectedChannel';

import Icons from 'react/components/UI/Icons';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import SelectableChannel from 'extension/src/components/SelectableChannel';

const ChannelContainer = styled(Box).attrs({
  mt: 1,
  mb: 4,
  mx: -4,
  p: 2,
})`
  border-top: 1px solid ${x => x.theme.colors.gray.light};
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

class SelectedChannel extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const { context } = this.props;

    if (!context.selectedChannel) {
      this.props.client.query({
        query: selectedChannelQuery,
      }).then(({ data: { me } }) => {
        context.selectChannel(me.recent_channels[0]);
      });
    }
  }

  selectChannel = () => {
    const { history } = this.props;
    history.push('/channels');
  }

  render() {
    const { context } = this.props;

    return (
      <React.Fragment>
        <Text f={2}>Connect to:</Text>
        <ChannelContainer onClick={this.selectChannel}>
          {!context.selectedChannel &&
            <Text f={4} p={3} fontWeight="bold">
              ...
            </Text>
          }
          {context.selectedChannel &&
            <SelectableChannel channel={context.selectedChannel} />
          }
          <Icons name="RightCaret" size="1rem" color="gray.semiLight" />
        </ChannelContainer>
      </React.Fragment>
    );
  }
}

export default withExtensionContext(withRouter(withApollo(SelectedChannel)));
