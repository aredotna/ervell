import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import blokkFragment from 'react/components/Blokk/fragments/blokk';

import constants from 'react/styles/constants';

import Typography from 'react/components/UI/Text';

import Attachment from 'react/components/Blokk/components/Attachment';
import Channel from 'react/components/Blokk/components/Channel';
import Embed from 'react/components/Blokk/components/Embed';
import Image from 'react/components/Blokk/components/Image';
import Link from 'react/components/Blokk/components/Link';
import Text from 'react/components/Blokk/components/Text';
import Metadata from 'react/components/Blokk/components/Metadata';
import BlokkOverlay from 'react/components/Blokk/components/BlokkOverlay';
import ChannelOverlay from 'react/components/Blokk/components/ChannelOverlay';

const BlokkMetadata = styled(Metadata)`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
`;

const Container = styled.a`
  box-sizing: border-box;
  position: relative;
  display: block;
  text-decoration: none;
  width: ${x => x.theme.constantValues.blockWidth};
  height: ${x => x.theme.constantValues.blockWidth};
  margin-bottom: ${x => x.theme.space[8]};
`;

const Comments = styled(Typography).attrs({
  mr: 6,
  mb: 6,
  px: 5,
  py: 3,
  f: 2,
})`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${x => x.theme.colors.utility.translucent};
  z-index: 1;
  border-radius: ${constants.radii.subtle};
`;

export default class Blokk extends Component {
  static propTypes = {
    blokk: propType(blokkFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  onMouseEnter = () => {
    if (this.state.mode === 'overlay') return;
    this.setState({ mode: 'hover' });
  }

  onMouseLeave = () => {
    if (this.state.mode === 'overlay') return;
    this.setState({ mode: 'resting' });
  }

  onOverlay = () =>
    this.setState({ mode: 'overlay' });

  onOverlayClose = () =>
    this.setState({ mode: 'hover' });

  render() {
    const { mode } = this.state;
    const { blokk } = this.props;

    return (
      <Container
        href={mode !== 'overlay' ? blokk.href : undefined}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {blokk.counts.comments > 0 && mode !== 'overlay' &&
          <Comments>
            {blokk.counts.comments}
          </Comments>
        }

        {[
          {
            Attachment: <Attachment key="attachment" attachment={blokk} mode={mode} />,
            Channel: <Channel key="channel" channel={blokk} mode={mode} />,
            Embed: <Embed key="embed" embed={blokk} mode={mode} />,
            Image: <Image key="image" image={blokk} mode={mode} />,
            Link: <Link key="link" link={blokk} mode={mode} />,
            Text: <Text key="text" text={blokk} mode={mode} />,
          }[blokk.__typename],

          blokk.__typename !== 'Channel' &&
            <BlokkMetadata
              key="metadata"
              mode={mode}
              blokk={blokk}
            />,

          blokk.__typename !== 'Channel' && mode !== 'resting' &&
            <BlokkOverlay
              key="overlay"
              blokk={blokk}
              onOverlay={this.onOverlay}
              onClose={this.onOverlayClose}
            />,

          blokk.__typename === 'Channel' && mode !== 'resting' &&
            <ChannelOverlay
              key="overlay"
              channel={blokk}
              onOverlay={this.onOverlay}
              onClose={this.onOverlayClose}
            />,
        ]}
      </Container>
    );
  }
}
