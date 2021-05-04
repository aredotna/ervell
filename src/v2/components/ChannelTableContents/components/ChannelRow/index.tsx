import React from 'react'
import styled from 'styled-components'
import { blend } from 'chroma-js'
import { themeGet } from 'styled-system'
import { ChannelTableContentsSet_channel_blokks_Channel } from '__generated__/ChannelTableContentsSet'
import { StandardCell } from '../StandardCell'
import { lighten } from 'v2/styles/functions'

const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};

  &:last-child {
    border-right: 1px solid;
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
      background-color: ${lighten(`channel.${props.visibility}`, 0.025)};

      &:last-child {
        border-right-color: ${blend(color, '#bbb', blendMode)};
      }
    `
  }}
`

const Row = styled.tr`
  ${props => {
    const color = props.theme.colors.channel[props.visibility]

    return `
      &:hover ${TD} {
        border-top-color: ${color};
        border-bottom-color: ${color};
      }

      &:hover ${TD}:first-child {
        border-left-color: ${color};
      }

      &:hover ${TD}:last-child {
        border-right-color: ${color};
      }
    `
  }}
`

interface ChannelRowProps {
  channel: ChannelTableContentsSet_channel_blokks_Channel
}

export const ChannelRow: React.FC<ChannelRowProps> = ({ channel }) => {
  return (
    <Row visibility={channel.visibility}>
      <Cell visibility={channel.visibility} colSpan={2}>
        <StandardCell
          value={channel.title}
          color={`channel.${channel.visibility}`}
        />
      </Cell>
      <Cell visibility={channel.visibility}>
        <StandardCell
          value={channel.updated_at}
          color={`channel.${channel.visibility}`}
        />
      </Cell>
      <Cell visibility={channel.visibility}>
        <StandardCell
          value={channel.user.name}
          color={`channel.${channel.visibility}`}
        />
      </Cell>
      <Cell visibility={channel.visibility}>
        <StandardCell
          value={channel.counts.connected_to_channels}
          color={`channel.${channel.visibility}`}
        />
      </Cell>
    </Row>
  )
}
