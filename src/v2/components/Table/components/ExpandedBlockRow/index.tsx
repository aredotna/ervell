import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import { ExpandedBlockRowContents } from './components/ExpandedBlockRowContents'
import { ExpandedBlockMetadata } from './components/ExpandedBlockMetadata'
import { FullBlockMetadataFoldWithQuery } from 'v2/components/FullBlock/components/FullBlockMetadataFold'
import Box from 'v2/components/UI/Box'
import { ActionButtons } from '../ExpandedActionButtons'
import { FIRST_COLUMN_WIDTH } from '../../lib/constants'
import { ProfileTableContents_user_contents } from '__generated__/ProfileTableContents'

const Row = styled.tr`
  border-color: transparent;
  height: 450px;
  max-height: 450px;
`

const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border-top: 1px solid ${x => x.theme.colors.gray.block};
  border-bottom: 1px solid ${x => x.theme.colors.gray.block};
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 450px;
  max-height: 450px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  vertical-align: top;
  position: relative;
  overflow: scroll;
  display: table-cell;

  &:first-child {
    border-left: 1px solid ${x => x.theme.colors.gray.block};
  }

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.block};
  }
`

const CollapseArea = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  cursor: pointer;
`

const ContentTD = styled(TD)``

const ContentContainer = styled(Box)`
  height: 100%;
  max-height: 450px;
  overflow: hidden;
  border-right: 1px solid ${x => x.theme.colors.gray.hint};
`

const MetadataContainer = styled(Box).attrs({
  p: 5,
})`
  height: 100%;
  max-height: 450px;
  overflow: scroll;
`

const ButtonContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`

const MetadataFoldContainer = styled(Box)`
  overflow: scroll;
  height: 100%;
  max-height: 450px;
`

export interface ExpandedBlockRowProps {
  block:
    | ChannelTableContentsSet_channel_blokks
    | ProfileTableContents_user_contents
  columnLength: number
  onMinimize: () => void
}

export const ExpandedBlockRow = forwardRef<HTMLElement, ExpandedBlockRowProps>(
  ({ block, columnLength, onMinimize, ...rest }, ref) => {
    return (
      <Row {...rest} ref={ref}>
        <ContentTD width={FIRST_COLUMN_WIDTH}>
          <CollapseArea onClick={onMinimize} />
          <ContentContainer>
            <ExpandedBlockRowContents block={block} />
          </ContentContainer>
        </ContentTD>
        <TD colSpan={columnLength - 4}>
          <CollapseArea onClick={onMinimize} />
          <MetadataContainer>
            <ExpandedBlockMetadata block={block} />
          </MetadataContainer>
        </TD>
        <TD colSpan={3}>
          <CollapseArea onClick={onMinimize} />
          <ButtonContainer>
            <ActionButtons
              isExpanded={true}
              canDelete
              onMinimize={onMinimize}
            />
          </ButtonContainer>
          <MetadataFoldContainer>
            <Box p={5} mt={7}>
              <FullBlockMetadataFoldWithQuery id={block.id.toString()} />
            </Box>
          </MetadataFoldContainer>
        </TD>
      </Row>
    )
  }
)

export default ExpandedBlockRow
