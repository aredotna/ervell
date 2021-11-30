import React, { useRef, useState } from 'react'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import SortArrows from 'v2/components/UI/SortArrows'

import constants from 'v2/styles/constants'
import { TableAddButton } from './components/AddButton'
import { ColumnIds, columnIdsToSorts } from '../..'
import { SortDirection, Sorts } from '__generated__/globalTypes'
import { TableData } from '../../lib/types'

export const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  max-width: ${x => x.maxWidth || 0};
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
  position: sticky;
  top: ${constants.headerHeight};
  background: ${x => x.theme.colors.background};
  z-index: 1;
`

const SettingsAddTH = styled(TH)`
  width: 60px;
  padding: 0;
  overflow: visible;
  vertical-align: top;
  line-height: 0;
`

interface ChannelTableHeaderProps {
  headerGroups: HeaderGroup<TableData>[]
  sort: Sorts
  setSort: (value: Sorts) => void
  direction: SortDirection
  setDirection: (value: SortDirection) => void
}

export const ChannelTableHeader: React.FC<ChannelTableHeaderProps> = ({
  headerGroups,
  sort,
  setSort,
  setDirection,
  direction,
}) => {
  const [, setMode] = useState<'resting' | 'add'>('resting')
  const headerRef = useRef<HTMLTableSectionElement>()

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
              if (column.Header.toString() === ColumnIds.addSettings) {
                return (
                  <SettingsAddTH
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <TableAddButton onClick={() => setMode('add')} />
                  </SettingsAddTH>
                )
              }

              const columnSortType: Sorts | undefined =
                columnIdsToSorts[column.id]

              let sortArrowState: 'off' | 'up' | 'down' | undefined
              if (columnSortType) {
                if (columnSortType === sort) {
                  sortArrowState =
                    direction === SortDirection.ASC ? 'up' : 'down'
                } else {
                  sortArrowState = 'off'
                }
              }

              const { key: headerKey, ...headerProps } = column.getHeaderProps()

              return (
                <TH key={headerKey} width={column.width} {...headerProps}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Text f={1} mr={5}>
                      {column.render('Header')}
                    </Text>

                    {columnSortType && sortArrowState && (
                      <SortArrows
                        state={sortArrowState}
                        onDown={() => {
                          setSort(columnSortType)
                          setDirection(SortDirection.DESC)
                        }}
                        onUp={() => {
                          setSort(columnSortType)
                          setDirection(SortDirection.ASC)
                        }}
                      />
                    )}
                  </Box>
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
