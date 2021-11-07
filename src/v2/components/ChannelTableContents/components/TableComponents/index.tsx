import styled from 'styled-components'

import constants from 'v2/styles/constants'

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${x => x.theme.space[4]};
  margin-bottom: ${x => x.theme.space[7]};
  table-layout: fixed;
`

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

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.light};
  }
`

export const THead = styled.thead``

export const TH = styled(TD)`
  font-weight: bold;
  padding: ${x => x.theme.space[2]} ${x => x.theme.space[4]};
  vertical-align: middle;
  position: sticky;
  top: ${constants.headerHeight};
  background: ${x => x.theme.colors.background};
  z-index: 1;
`

export const TR = styled.tr`
  cursor: zoom-in;

  &:hover ${TD} {
    border-top-color: ${x => x.theme.colors.gray.regular};
    border-bottom-color: ${x => x.theme.colors.gray.regular};
  }

  &:hover ${TD}:first-child {
    border-left-color: ${x => x.theme.colors.gray.regular};
  }

  &:hover ${TD}:last-child {
    border-right-color: ${x => x.theme.colors.gray.regular};
  }

  &:hover ${TH} {
    border-color: ${x => x.theme.colors.gray.light};
  }
`

export const HeaderRow = styled(TR)`
  cursor: text;
`