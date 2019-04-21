import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import channelFragment from 'v2/components/Cell/components/Konnectable/components/Channel/fragments/channel';

import { channelVisibilityForegroundColor } from 'v2/styles/mixins';

import constants from 'v2/styles/constants';

import Text from 'v2/components/UI/Text';
import Count from 'v2/components/UI/Count';
import Badge from 'v2/components/UI/Badge';
import BorderedLock from 'v2/components/UI/BorderedLock';

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

  &, ${Text} {
    ${channelVisibilityForegroundColor}
  }
`;

export default class Channel extends PureComponent {
  static propTypes = {
    channel: propType(channelFragment).isRequired,
  }

  render() {
    const { channel, ...rest } = this.props;

    return (
      <Container visibility={channel.visibility} {...rest}>
        <Text
          f={6}
          mx={4}
          pt={6}
          breakWord
          textAlign="center"
        >
          <span dangerouslySetInnerHTML={{ __html: channel.truncatedTitle }} />

          {channel.visibility === 'private' &&
            <BorderedLock ml={3} position="relative" top="-0.125rem" />
          }
        </Text>

        <Text my={4} f={2} textAlign="center">
          by {channel.owner.name}

          {channel.owner.__typename === 'Group' &&
            <Badge
              f={0}
              ml={4}
              color={`channel.${channel.visibility.toLowerCase()}`}
              icon={{ private: 'Lock' }[channel.owner.visibility]}
            >
              Group
            </Badge>
          }

          <br />

          <Count label="block" amount={channel.counts.contents} />

          {' • '}

          {channel.updated_at}
        </Text>
      </Container>
    );
  }
}
