import React from 'react'
import styled from 'styled-components'
import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import { FIRST_COLUMN_WIDTH } from '../..'
import { ExpandedBlockRowContents } from './components/ExpandedBlockRowContents'
import { ExpandedBlockMetadata } from './components/ExpandedBlockMetadata'

const Row = styled.tr`
  border-color: transparent;
`

const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-top-color: ${x => x.theme.colors.gray.block};
  border-bottom-color: ${x => x.theme.colors.gray.block};
  border-right-color: transparent;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 450px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};

  &:first-child {
    border-left: 1px solid ${x => x.theme.colors.gray.block};
  }

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.block};
  }
`

interface ExpandedBlockRowProps {
  block: ChannelTableContentsSet_channel_blokks
  columnLength: number
  onClick: () => void
}

export const ExpandedBlockRow: React.FC<ExpandedBlockRowProps> = ({
  block,
  columnLength,
  onClick,
  ...rest
}) => {
  console.log({ onClick })
  return (
    <Row onClick={onClick} {...rest}>
      <TD width={FIRST_COLUMN_WIDTH}>
        <ExpandedBlockRowContents block={block} />
      </TD>
      <TD colSpan={columnLength - 2}>
        <ExpandedBlockMetadata block={block} />
      </TD>
      <TD></TD>
    </Row>
  )
}

export default ExpandedBlockRow
