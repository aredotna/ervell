import React from 'react'
import styled from 'styled-components'
import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import { FIRST_COLUMN_WIDTH } from '../..'
import { ExpandedBlockRowContents } from './components/ExpandedBlockRowContents'
import { ExpandedBlockMetadata } from './components/ExpandedBlockMetadata'
import { FullBlockMetadataFoldWithQuery } from 'v2/components/FullBlock/components/FullBlockMetadataFold'
import Box from 'v2/components/UI/Box'

const Row = styled.tr`
  border-color: transparent;
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

  &:first-child {
    border-left: 1px solid ${x => x.theme.colors.gray.block};
  }

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.block};
  }
`

const MetadataFoldContainer = styled(Box)`
  overflow: scroll;
  height: 100%;
`

interface ExpandedBlockRowProps {
  block: ChannelTableContentsSet_channel_blokks
  columnLength: number
  onClick?: () => void
}

export const ExpandedBlockRow: React.FC<ExpandedBlockRowProps> = ({
  block,
  columnLength,
  onClick,
  ...rest
}) => {
  return (
    <Row onClick={onClick} {...rest}>
      <TD width={FIRST_COLUMN_WIDTH}>
        <ExpandedBlockRowContents block={block} />
      </TD>
      <TD colSpan={columnLength - 3}>
        <ExpandedBlockMetadata block={block} />
      </TD>
      <TD colSpan={2}>
        <MetadataFoldContainer>
          <Box p={4}>
            <FullBlockMetadataFoldWithQuery id={block.id.toString()} />
          </Box>
        </MetadataFoldContainer>
      </TD>
    </Row>
  )
}

export default ExpandedBlockRow
