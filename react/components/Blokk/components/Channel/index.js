import React from 'react';
import styled from 'styled-components';

import { channelVisibilityForegroundColor } from 'react/styles/mixins';

import constants from 'react/styles/constants';

import Text from 'react/components/UI/Text';
import Count from 'react/components/UI/Count';
import Truncate from 'react/components/UI/Truncate';
import Connectable from 'react/components/Blokk/components/Connectable';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: ${constants.radii.subtle};
  ${channelVisibilityForegroundColor}
`;

export default class Channel extends Connectable {
  render() {
    const { channel, ...rest } = this.props;

    return (
      <Container visibility={channel.visibility} {...rest}>
        <Text pt={6} mx={4} f={6} textAlign="center">
          <Truncate length={90} title={channel.title}>
            {channel.title}
          </Truncate>
        </Text>

        <Text my={4} f={2} textAlign="center">
          by {channel.owner.name}
          <br />
          <Count label="block" amount={channel.counts.contents} />
          {' • '}
          {channel.updated_at}
        </Text>
      </Container>
    );
  }
}
