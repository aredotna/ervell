/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'

import { EmbeddedChannelContents as EmbeddedChannelContentsData } from '__generated__/EmbeddedChannelContents'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import { Count } from 'v2/components/UI/Count'
import Truncate from 'v2/components/UI/Truncate'
import {
  KonnectableSimpleDisplay,
  ObjectFit,
} from 'v2/components/Cell/components/Konnectable/components/KonnectableSimpleDisplay'

const SIZE = '9rem'

const Container = styled(Box).attrs({
  overflowScrolling: true,
  px: 3,
})`
  flex: 1;
`

const Center = styled(Box).attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`

const Grid = styled(Box).attrs({
  pt: 6,
})`
  display: flex;
  align-items: center;
  justify-content: ${({ length }: { length: number }) =>
    length === 1 ? 'center' : 'space-between'};
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
`

const Item = styled(Box).attrs({
  width: SIZE,
  height: SIZE,
  mx: 3,
  mb: 8,
})`
  position: relative;
`

const Caption = styled(Text).attrs({
  f: 0,
  color: 'gray.medium',
  fontWeight: 'bold',
  mt: 6,
})`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  text-align: center;
`

const Inner = ({ connectable }) => {
  switch (connectable.__typename) {
    case 'Text':
      return (
        <Box
          p={3}
          border="1px solid"
          borderColor="gray.light"
          width="100%"
          height="100%"
          overflow="hidden"
        >
          <KonnectableSimpleDisplay connectable={connectable} />
        </Box>
      )
    default:
      return (
        <KonnectableSimpleDisplay
          connectable={connectable}
          objectFit={ObjectFit.CONTAIN}
        />
      )
  }
}

interface Props {
  channel: EmbeddedChannelContentsData
}

export const EmbeddedChannelContents: React.FC<Props> = ({ channel }) => {
  return (
    <Container>
      <Center>
        <Grid length={channel.contents.length}>
          {channel.contents.map(connectable => {
            return (
              <Link
                key={`${connectable.__typename}:${connectable.id}`}
                href={connectable.href}
                target="_blank"
                display="block"
              >
                <Item>
                  <Inner connectable={connectable} />

                  {connectable.title && connectable.__typename !== 'Channel' && (
                    <Caption>
                      <Truncate length={25}>{connectable.title}</Truncate>
                    </Caption>
                  )}
                </Item>
              </Link>
            )
          })}
        </Grid>

        <Box width="100%" textAlign="right" p={6}>
          <Text f={1} underlineLinks>
            <a href={channel.href} target="_blank">
              +{' '}
              <Count
                amount={channel.counts.contents - channel.contents.length}
                label="more block"
              />
            </a>
          </Text>
        </Box>
      </Center>
    </Container>
  )
}
