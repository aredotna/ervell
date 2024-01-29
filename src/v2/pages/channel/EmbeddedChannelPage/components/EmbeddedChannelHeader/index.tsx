/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'

import { EmbeddedChannelHeader as EmbeddedChannelHeaderData } from '__generated__/EmbeddedChannelHeader'

import Box from 'v2/components/UI/Box'
import _Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

const Container = styled(Box).attrs({
  borderBottom: '1px solid',
  borderColor: 'gray.light',
  px: 6,
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${props => props.theme.constantValues.topBarHeight};
  flex-shrink: 0;
`

const Metadata = styled(Box)`
  display: flex;
`

const Text = styled(_Text).attrs({
  f: [4, 4, 5],
  fontWeight: 'bold',
})``

interface Props {
  channel: EmbeddedChannelHeaderData
}

export const EmbeddedChannelHeader: React.FC<Props> = ({ channel }) => {
  return (
    <Container>
      <Metadata>
        <Text color="gray.medium">
          {/* This can stay an absolute link, just in case */}
          <a href="https://www.are.na" target="_blank">
            Are.na
          </a>
        </Text>

        <Text mx={3} color="gray.regular">
          /
        </Text>

        <Text color="gray.medium">
          <a href={channel.owner.href} target="_blank">
            {channel.owner.name}
          </a>
        </Text>

        <Text mx={3} color="gray.regular">
          /
        </Text>

        <Text color={`channel.${channel.visibility}`}>
          <a href={channel.href} target="_blank">
            <span dangerouslySetInnerHTML={{ __html: channel.title }} />
          </a>
        </Text>
      </Metadata>

      {/* This can stay an absolute link, just in case */}
      <a href="https://www.are.na/" target="_blank">
        <Icons name="ArenaMark" size="1.5em" color="gray.base" />
      </a>
    </Container>
  )
}
