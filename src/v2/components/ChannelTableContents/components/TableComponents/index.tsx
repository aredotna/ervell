import styled from 'styled-components'
import { bgColor } from 'styled-system'
import Text from 'v2/components/UI/Text'

import constants from 'v2/styles/constants'

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${x => x.theme.space[4]};
  margin-bottom: ${x => x.theme.space[7]};
  table-layout: fixed;

  colgroup {
    display: table-column;
  }
`

export const TD = styled.td`
  ${bgColor}
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px !important;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  max-width: ${x => x.width || `0px`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: table-cell;

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
  cursor: default;
`

export const TR = styled.tr`
  cursor: zoom-in;
  background: ${x => x.theme.colors.background};
  height: 30px !important;

  .dragging {
    display: table !important;
    table-layout: fixed !important;
  }

  &:hover ${TD} {
    border-top-color: ${x => x.theme.colors.gray.regular};
    border-bottom-color: ${x => x.theme.colors.gray.regular};
    color: ${x => x.theme.colors.gray.bold} !important;
  }

  &:hover ${TD} ${Text} {
    color: ${x => x.theme.colors.gray.extraold} !important;
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
