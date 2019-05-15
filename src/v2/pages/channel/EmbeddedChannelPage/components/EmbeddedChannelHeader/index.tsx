/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'

import { EmbeddedChannelHeader as EmbeddedChannelHeaderData } from '__generated__/EmbeddedChannelHeader'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

const Container = styled(Box).attrs({
  borderBottom: '1px solid',
  borderColor: 'gray.light',
  px: 6,
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${props => props.theme.constantValues.topBarHeight};
  background-color: white;
  z-index: 1;
`

const Metadata = styled(Box)`
  display: flex;
`

interface Props {
  channel: EmbeddedChannelHeaderData
}

export const EmbeddedChannelHeader: React.FC<Props> = ({ channel }) => {
  return (
    <Container>
      <Metadata>
        <Text f={5} fontWeight="bold" color="gray.medium">
          <a href="https://www.are.na" target="_blank">
            Are.na
          </a>
        </Text>

        <Text f={5} fontWeight="bold" mx={3} color="gray.regular">
          /
        </Text>

        <Text f={5} fontWeight="bold" color="gray.medium">
          <a href={channel.owner.href} target="_blank">
            {channel.owner.name}
          </a>
        </Text>

        <Text f={5} fontWeight="bold" mx={3} color="gray.regular">
          /
        </Text>

        <Text f={5} fontWeight="bold" color={`channel.${channel.visibility}`}>
          <a href={channel.href} target="_blank">
            {channel.title}
          </a>
        </Text>
      </Metadata>

      <a href="https://www.are.na/" target="_blank">
        <Icons name="ArenaMark" size={7} color="gray.base" />
      </a>
    </Container>
  )
}
