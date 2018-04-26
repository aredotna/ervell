import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { isNull } from 'underscore';
import { graphql } from 'react-apollo';

import GenericInput from 'react/components/UI/GenericInput';
import CopyToClipboard from 'react/components/UI/CopyToClipboard';

import shareChannelMutation from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/mutations/shareChannel';
import channelShareButtonFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/fragments/channelShareButton';

const Container = styled.div`
  ${x => x.mode === 'active' && `
    margin: 1em 0;
  `}
`;

const Actions = styled.div`
  margin: 1em 0;
`;

const Button = styled.a.attrs({
  role: 'button',
  tabIndex: 0,
})`
  display: block;
`;

class ChannelShareButton extends Component {
  static propTypes = {
    channel: propType(channelShareButtonFragment).isRequired,
    shareChannel: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    remote: 'resting',
  }

  disableShareLink = async () => {
    const { channel, shareChannel } = this.props;

    this.setState({ remote: 'disabling' });

    await shareChannel({
      variables: { id: channel.id, enable: false },
    });

    this.setState({ mode: 'resting', remote: 'resting' });
  }

  displayShareOptions = async () => {
    const { channel, shareChannel } = this.props;

    if (isNull(channel.share.url)) {
      this.setState({ remote: 'generating' });

      await shareChannel({
        variables: { id: channel.id, enable: true },
      });
    }

    this.setState({ mode: 'active', remote: 'resting' });
  }

  render() {
    const { mode, remote } = this.state;
    const { channel } = this.props;

    return (
      <Container mode={mode}>
        {mode !== 'active' &&
          <Button onClick={this.displayShareOptions}>
            {{
              resting: 'Share',
              generating: 'Generating...',
            }[remote]}
          </Button>
        }

        {mode === 'active' &&
          <div>
            <GenericInput
              size="xs"
              value={channel.share.url}
              readOnly
            />

            <Actions>
              <CopyToClipboard
                label="Copy link"
                value={channel.share.url}
              />

              {channel.visibility === 'private' &&
                <Button onClick={this.disableShareLink}>
                  {{
                    resting: 'Disable share link',
                    disabling: 'Disabling...',
                  }[remote]}
                </Button>
              }

              {channel.share.twitter_url &&
                <Button href={channel.share.twitter_url} target="_blank">
                  Twitter
                </Button>
              }

              {channel.share.facebook_url &&
                <Button href={channel.share.facebook_url} target="_blank">
                  Facebook
                </Button>
              }
            </Actions>
          </div>
        }
      </Container>
    );
  }
}

export default graphql(shareChannelMutation, {
  name: 'shareChannel',
})(ChannelShareButton);
