import styled from 'styled-components'
import { BaseText } from 'v2/components/ContentfulContent'

import Box from 'v2/components/UI/Box'
import constants from 'v2/styles/constants'

export const TableSection = styled(Box).attrs({
  mt: 8,
  mb: 10,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${constants.media.small`
    align-items: center;
    flex-direction: column;
  `}

  ${constants.media.mobile`
    align-items: center;
    flex-direction: column;
  `}
`

export const Table = styled(Box)`
  display: flex;
  flex-direction: row;

  ${constants.media.small`
    align-items: center;
    flex-direction: column;
  `}

  ${constants.media.mobile`
    align-items: center;
    flex-direction: column;
  `}
`

export const Column = styled(Box).attrs({})`
  border: 1px solid ${x => x.theme.colors.gray.light};
  width: 15em;
  margin-right: -1px;
  color: ${x => x.theme.colors.gray.bold};

  &:first-child {
    border-top-left-radius: ${constants.radii.regular};
    border-bottom-left-radius: ${constants.radii.regular};
  }

  &:last-child {
    border-top-right-radius: ${constants.radii.regular};
    border-bottom-right-radius: ${constants.radii.regular};
  }

  ${BaseText} {
    margin: 0;
  }
`

export const LightColumn = styled(Column)`
  color: ${x => x.theme.colors.gray.regular};
`

export const Cell = styled(Box).attrs({
  p: [4],
})`
  line-height: ${x => x.theme.lineHeightsIndexed.base};
  max-height: ${x => x.theme.space[11]};
  overflow: scroll;
  font-size: ${x => x.theme.fontSizesIndexed.sm};

  ul {
    list-style-type: disc;
    margin-left: ${x => x.theme.space[6]} !important;
    margin-top: 0 !important;
    padding: 0 !important;
  }

  li {
    padding: ${x => x.theme.space[3]} 0 !important;
  }

  h1 {
    margin: 0;
  }
`

export const ColumnHeader = styled(Cell)`
  font-size: ${x => x.theme.fontSizesIndexed.h6};
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
`
