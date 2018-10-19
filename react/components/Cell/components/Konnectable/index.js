import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import konnectableFragment from 'react/components/Cell/components/Konnectable/fragments/konnectable';

import constants from 'react/styles/constants';

import Typography from 'react/components/UI/Text';

import Attachment from 'react/components/Cell/components/Konnectable/components/Attachment';
import Channel from 'react/components/Cell/components/Konnectable/components/Channel';
import Embed from 'react/components/Cell/components/Konnectable/components/Embed';
import Image from 'react/components/Cell/components/Konnectable/components/Image';
import Link from 'react/components/Cell/components/Konnectable/components/Link';
import Text from 'react/components/Cell/components/Konnectable/components/Text';
import Metadata from 'react/components/Cell/components/Konnectable/components/Metadata';
import BlokkOverlay from 'react/components/Cell/components/Konnectable/components/BlokkOverlay';
import ChannelOverlay from 'react/components/Cell/components/Konnectable/components/ChannelOverlay';

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

export default class Konnectable extends Component {
  static propTypes = {
    konnectable: propType(konnectableFragment).isRequired,
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
    const { konnectable } = this.props;

    return (
      <Container
        href={mode !== 'overlay' ? konnectable.href : undefined}
        role="button"
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {konnectable.counts.comments > 0 && mode !== 'overlay' &&
          <Comments>
            {konnectable.counts.comments}
          </Comments>
        }

        {[
          {
            Attachment: <Attachment key="attachment" attachment={konnectable} mode={mode} />,
            Channel: <Channel key="channel" channel={konnectable} mode={mode} />,
            Embed: <Embed key="embed" embed={konnectable} mode={mode} />,
            Image: <Image key="image" image={konnectable} mode={mode} />,
            Link: <Link key="link" link={konnectable} mode={mode} />,
            Text: <Text key="text" text={konnectable} mode={mode} />,
          }[konnectable.__typename],

          konnectable.__typename !== 'Channel' &&
            <BlokkMetadata
              key="metadata"
              mode={mode}
              konnectable={konnectable}
            />,

          konnectable.__typename !== 'Channel' && mode !== 'resting' &&
            <BlokkOverlay
              key="overlay"
              konnectable={konnectable}
              onOverlay={this.onOverlay}
              onClose={this.onOverlayClose}
            />,

          konnectable.__typename === 'Channel' && mode !== 'resting' &&
            <ChannelOverlay
              key="overlay"
              channel={konnectable}
              onOverlay={this.onOverlay}
              onClose={this.onOverlayClose}
            />,
        ]}
      </Container>
    );
  }
}
