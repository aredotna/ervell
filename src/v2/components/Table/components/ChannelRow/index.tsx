import React, { forwardRef, useCallback, useState } from 'react'
import styled from 'styled-components'
import { blend } from 'chroma-js'
import { Row as RowType } from 'react-table'
import { themeGet } from 'styled-system'

import { StandardCell } from '../StandardCell'
import { lighten } from 'v2/styles/functions'
import { TableData } from '../../lib/constants'

import { ChannelPage_channel } from '__generated__/ChannelPage'
import { TableRow_blokk_Channel } from '__generated__/TableRow'

const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  user-select: none;

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
      cursor: zoom-in;

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
  connectableChannel: TableRow_blokk_Channel
  row: RowType<TableData>
  expanded: boolean
  removeBlock?: (args: { id: number; type: string }) => void
  moveBlock?: (args: { oldIndex: number; newIndex: number }) => void
  channel?: ChannelPage_channel
  onClick: () => void
  isRowMovable?: boolean
}

export const ChannelRow = forwardRef<HTMLElement, ChannelRowProps>(
  (
    { connectableChannel, row, removeBlock, channel, moveBlock, isRowMovable },
    ref
  ) => {
    const [mode, setMode] = useState<'resting' | 'active'>('resting')

    const onRowClick = useCallback(
      (e: React.MouseEvent) => {
        if (mode === 'active') {
          e.stopPropagation()
          e.preventDefault()
          return
        }

        row.toggleRowExpanded(true)
      },
      [mode]
    )

    const settingsProps = {
      removeBlock,
      channel,
      moveBlock,
      onClickConnect: setMode,
      index: row.index,
      isRowMovable,
    }

    const cells = row.cells.map(cell => {
      const { key: cellKey, ...cellProps } = cell.getCellProps()
      const isSettings = cellKey.toString().includes('addSettings')
      const isTitle = cellKey.toString().includes('title')
      const isContent = cellKey.toString().includes('content')

      if (isTitle) {
        return (
          <Cell
            key={cell.getCellProps().key}
            visibility={connectableChannel.visibility}
            colSpan={2}
          >
            <StandardCell
              value={`${connectableChannel.title} – ${connectableChannel.counts.contents} blocks`}
              color={`channel.${connectableChannel.visibility}`}
            />
          </Cell>
        )
      }

      if (isContent) {
        return null
      }

      if (isSettings) {
        return (
          <Cell
            key={cell.getCellProps().key}
            width={cell.column.width}
            maxWidth={cell.column.maxWidth}
            visibility={connectableChannel.visibility}
          >
            {cell.render('Cell', settingsProps)}
          </Cell>
        )
      }

      return (
        <Cell
          visibility={connectableChannel.visibility}
          key={cell.getCellProps().key}
          width={cell.column.width}
          maxWidth={cell.column.maxWidth}
        >
          {cell.render('Cell', {
            ...cellProps,
            color: `channel.${connectableChannel.visibility}`,
          })}
        </Cell>
      )
    })

    return (
      <Row
        ref={ref}
        visibility={connectableChannel.visibility}
        onClick={onRowClick}
      >
        {cells}
      </Row>
    )
  }
)
