import React, { useRef } from 'react'
import { HeaderGroup } from 'react-table'
import styled, { css } from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import SortArrows from 'v2/components/UI/SortArrows'

import {
  ConnectableTypeEnum,
  SortDirection,
  Sorts,
} from '__generated__/globalTypes'
import { ColumnIds, SortAndSortDir } from '../../lib/types'
import { ChannelTableConnectors_channel_connectors } from '__generated__/ChannelTableConnectors'
import { columnIdsToSorts } from '../../lib/constants'
import { ProfileTableContents_user } from '__generated__/ProfileTableContents'
import { TableData } from 'v2/components/Table/lib/constants'
import { TableAddButton } from 'v2/components/ChannelTableContents/components/ChannelTableHeader/components/FilterAndAddButton'

export const TDMixin = css`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 32px;
  max-height: 30px;
  line-height: 30px;
  padding: 0;
  min-width: ${x => x.width};
  width: ${x => x.width};
  max-width: ${x => x.width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: table-cell;
  user-select: none;

  &:nth-last-of-type(1) {
    border-right: 1px solid ${x => x.theme.colors.gray.light};
  }
`

export const TR = styled.tr``

const HeaderRow = styled(TR)`
  cursor: default;
`

const TH = styled.th.attrs({
  scope: 'col',
})`
  ${TDMixin}
  font-weight: bold;
  vertical-align: middle;
  background: ${x => x.theme.colors.background};
  position: sticky;
  top: 64px;
  z-index: 1;
`

const THInner = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: ${x => x.theme.space[2]} ${x => x.theme.space[4]};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const SettingsAddTH = styled(TH)`
  min-width: 100px;
  padding: 0;
  overflow: visible;
  vertical-align: middle;
  background-color: ${props =>
    props.canAdd ? props.theme.colors.gray.hint : props.theme.colors.white};

  ${props =>
    !props.canAdd &&
    `
    border-right: 1px solid transparent !important;
  `}
`

interface ProfileTableHeaderProps {
  headerGroups: HeaderGroup<TableData>[]
  profile: ProfileTableContents_user
  sortAndSortDir: SortAndSortDir
  setSortAndSortDir: React.Dispatch<SortAndSortDir>
  type?: ConnectableTypeEnum
  user?: ChannelTableConnectors_channel_connectors
}

export const ProfileTableHeader: React.FC<ProfileTableHeaderProps> = ({
  headerGroups,
  // profile,
  sortAndSortDir,
  setSortAndSortDir,
  type,
  user,
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
              if (column.Header?.toString() === ColumnIds.addSettings) {
                return (
                  <SettingsAddTH width="103px" key={column.Header?.toString()}>
                    <TableAddButton ref={headerRef} type={type} user={user} />
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

              if (column.Header?.toString() === ColumnIds.addSettings) {
                return (
                  <TH key={headerKey} width={column.width} {...headerProps}>
                    <THInner></THInner>
                  </TH>
                )
              }

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

export default ProfileTableHeader
