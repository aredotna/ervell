import React, { useRef } from 'react'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import SortArrows from 'v2/components/UI/SortArrows'

import constants from 'v2/styles/constants'
import { TableAddButton } from './components/AddButton'
import { SortDirection, Sorts } from '__generated__/globalTypes'
import { ColumnIds, SortAndSortDir, TableData } from '../../lib/types'
import { ChannelPage_channel } from '__generated__/ChannelPage'
import { columnIdsToSorts } from '../../lib/constants'

export const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;
  line-height: 0;
  padding: 0;
  min-width: ${x => x.width};
  width: ${x => x.width};
  max-width: ${x => x.width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-last-of-type(1) {
    border-right: 1px solid ${x => x.theme.colors.gray.light};
  }
`

export const TR = styled.tr``

const HeaderRow = styled(TR)`
  cursor: text;
`

const TH = styled(TD)`
  font-weight: bold;
  padding: ${x => x.theme.space[2]} ${x => x.theme.space[4]};
  vertical-align: middle;
  background: ${x => x.theme.colors.background};
  position: sticky;
  top: ${constants.headerHeight};
  z-index: 1;
`

const THInner = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const SettingsAddTH = styled(TH)`
  min-width: 60px;
  padding: 0;
  overflow: visible;
  vertical-align: top;
  line-height: 0;
`

interface ChannelTableHeaderProps {
  headerGroups: HeaderGroup<TableData>[]
  channel: ChannelPage_channel
  sortAndSortDir: SortAndSortDir
  setSortAndSortDir: React.Dispatch<SortAndSortDir>
  addBlock: () => void
}

export const ChannelTableHeader: React.FC<ChannelTableHeaderProps> = ({
  headerGroups,
  channel,
  sortAndSortDir,
  setSortAndSortDir,
  addBlock,
}) => {
  const headerRef = useRef<HTMLTableSectionElement>(null)

  return (
    <thead ref={headerRef}>
      {headerGroups.map(headerGroup => {
        const {
          key: headerGroupKey,
          ...headerGroupProps
        } = headerGroup.getHeaderGroupProps()

        return (
          <HeaderRow key={headerGroupKey} {...headerGroupProps}>
            {headerGroup.headers.map(column => {
              if (
                column.Header?.toString() === ColumnIds.addSettings &&
                channel.can?.add_to &&
                channel.can.add_to_as_premium
              ) {
                return (
                  <SettingsAddTH width="60px">
                    {/* <Box width="100px" /> */}
                    <TableAddButton
                      channelId={channel.id}
                      ref={headerRef}
                      addBlock={addBlock}
                    />
                  </SettingsAddTH>
                )
              }

              const columnSortType: Sorts | undefined =
                columnIdsToSorts[column.id]

              let sortArrowState: 'off' | 'up' | 'down' | undefined
              if (columnSortType) {
                if (columnSortType === sortAndSortDir.sort) {
                  sortArrowState =
                    sortAndSortDir.dir === SortDirection.ASC ? 'up' : 'down'
                } else {
                  sortArrowState = 'off'
                }
              }

              const { key: headerKey, ...headerProps } = column.getHeaderProps()

              return (
                <TH key={headerKey} width={column.width} {...headerProps}>
                  <THInner>
                    <Text f={1} lineHeight={1.5} mr={5}>
                      {column.render('Header')}
                    </Text>

                    {columnSortType && sortArrowState && (
                      <SortArrows
                        state={sortArrowState}
                        onDown={() => {
                          setSortAndSortDir({
                            sort: columnSortType,
                            dir: SortDirection.DESC,
                          })
                        }}
                        onUp={() => {
                          setSortAndSortDir({
                            sort: columnSortType,
                            dir: SortDirection.ASC,
                          })
                        }}
                      />
                    )}

                    {/* For the sake of positioning */}
                    {!columnSortType && <Box />}
                  </THInner>
                </TH>
              )
            })}
          </HeaderRow>
        )
      })}
    </thead>
  )
}

export default ChannelTableHeader
