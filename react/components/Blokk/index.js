import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import blokkFragment from 'react/components/Blokk/fragments/blokk';

import Attachment from 'react/components/Blokk/components/Attachment';
import Channel from 'react/components/Blokk/components/Channel';
import Embed from 'react/components/Blokk/components/Embed';
import Image from 'react/components/Blokk/components/Image';
import Link from 'react/components/Blokk/components/Link';
import Text from 'react/components/Blokk/components/Text';
import User from 'react/components/Blokk/components/User';
import Group from 'react/components/Blokk/components/Group';
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

    const nonBlock = blokk.__typename === 'Channel' || blokk.__typename === 'User' || blokk.__typename === 'Group';

    return (
      <Container
        href={mode !== 'overlay' ? blokk.href : undefined}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {[
          {
            Attachment: <Attachment key="attachment" attachment={blokk} mode={mode} />,
            Channel: <Channel key="channel" channel={blokk} mode={mode} />,
            Embed: <Embed key="embed" embed={blokk} mode={mode} />,
            Image: <Image key="image" image={blokk} mode={mode} />,
            Link: <Link key="link" link={blokk} mode={mode} />,
            Text: <Text key="text" text={blokk} mode={mode} />,
            User: <User key="user" user={blokk} mode={mode} />,
            Group: <Group key="group" group={blokk} mode={mode} />,
          }[blokk.__typename],

          !nonBlock &&
            <BlokkMetadata
              key="metadata"
              mode={mode}
              blokk={blokk}
            />,

          !nonBlock && mode !== 'resting' &&
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
