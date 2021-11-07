import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { blend } from 'chroma-js'
import { themeGet } from 'styled-system'
import { ChannelTableContentsSet_channel_blokks_Channel } from '__generated__/ChannelTableContentsSet'
import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import { ExpandedChannelRowContents } from './ExpandedChannelRowContents'
import { FullChannelMetadataPane } from 'v2/components/FullChannel/components/FullChannelMetadataPane'
import { ActionButtons } from '../ActionButtons'

const Row = styled.tr`
  border-color: transparent;
`

const ButtonContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
`

const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border-top: 1px solid ${x => x.theme.colors.gray.block};
  border-bottom: 1px solid ${x => x.theme.colors.gray.block};
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 450px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  vertical-align: top;
  position: relative;

  &:first-child {
    border-left: 1px solid ${x => x.theme.colors.gray.block};
  }

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.block};
  }
`

const Cell = styled(TD)`
  ${props => {
    const color =
      props.theme.colors.channel[props.visibility] ||
      themeGet(`colors.${props.color}`, props.theme.colors.gray.base)(props)

    const blendMode = props.theme.name === 'dark' ? 'darken' : 'screen'

    return `
      color: ${color};
      border-color: ${
        props.mode === 'hover' ? ` ${color}` : blend(color, '#bbb', blendMode)
      };

      &:first-child {
        border-left-color: ${blend(color, '#bbb', blendMode)};
      }

      &:last-child {
        border-right-color: ${blend(color, '#bbb', blendMode)};
      }
    `
  }}
`

interface ExpandedChannelRowProps {
  channel: ChannelTableContentsSet_channel_blokks_Channel
  columnLength: number
  onMinimize?: () => void
}

export const ExpandedChannelRow = forwardRef<
  HTMLElement,
  ExpandedChannelRowProps
>(({ channel, columnLength, onMinimize }, ref) => {
  return (
    <Row ref={ref}>
      <Cell visibility={channel.visibility} colSpan={columnLength - 3}>
        <Box p={4}>
          <Text color={`channel.${channel.visibility}`} f={5}>
            {channel.title}
          </Text>
        </Box>
        <Box>
          <ExpandedChannelRowContents id={channel.id} />
        </Box>
      </Cell>
      <Cell visibility={channel.visibility} colSpan={3}>
        <ButtonContainer>
          <ActionButtons isExpanded={true} canDelete onMinimize={onMinimize} />
        </ButtonContainer>
        <FullChannelMetadataPane
          id={channel.id.toString()}
          connection={channel.connection}
        />
      </Cell>
    </Row>
  )
})

export default ExpandedChannelRow
