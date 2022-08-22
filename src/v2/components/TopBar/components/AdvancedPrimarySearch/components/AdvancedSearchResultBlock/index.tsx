import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router'

import { mixin as boxMixin } from 'v2/components/UI/Box'
import { overflowEllipsis } from 'v2/styles/mixins'

import Text from 'v2/components/UI/Text'
import { AdaptibleLink } from 'v2/components/UI/AdaptibleLink'
import {
  AdvancedQuickSearchResultBlock_Attachment,
  AdvancedQuickSearchResultBlock_Embed,
  AdvancedQuickSearchResultBlock_Image,
  AdvancedQuickSearchResultBlock_Link,
  AdvancedQuickSearchResultBlock_Text,
} from '__generated__/AdvancedQuickSearchResultBlock'
import { PrimarySearchIcon } from '../../../PrimarySearch/components/PrimarySearchResults/PrimarySearchIcon'

const Container = styled(AdaptibleLink).attrs({
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
  pr: 6,
  py: 6,
})`
  ${boxMixin}
  display: flex;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.gray.light};

  &:hover {
    background-color: ${props => props.theme.colors.gray.hint};
  }

  ${props =>
    props.selected &&
    `
    background-color: ${props.theme.colors.state.neutral};
  `}
`

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

const Label = styled(Text)`
  font-weight: bold;
  // Push out to accomodate "overflowing" badge border
  padding-right: 1px;
  ${overflowEllipsis}
`

const SmallLabel = styled(Text).attrs({
  f: [1],
  color: 'gray.medium',
})`
  text-transform: uppercase;
`

export type ResultBlock =
  | AdvancedQuickSearchResultBlock_Attachment
  | AdvancedQuickSearchResultBlock_Embed
  | AdvancedQuickSearchResultBlock_Image
  | AdvancedQuickSearchResultBlock_Link
  | AdvancedQuickSearchResultBlock_Text

interface AdvancedSearchResultBlockProps {
  result: ResultBlock
  selected?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const AdvancedSearchResultBlock: React.FC<AdvancedSearchResultBlockProps> = ({
  result,
  selected,
  onClick,
  children,
}) => {
  console.log({ result, selected })

  const location = useLocation()

  const state = location && {
    background: JSON.stringify(location),
    context: [],
  }

  return (
    <Container
      to={result.href}
      state={state}
      selected={selected}
      onClick={onClick}
    >
      <PrimarySearchIcon result={result} />
      <ResultContainer>
        <Label>{result.title}</Label>
        <SmallLabel>
          {result.__typename} – by {result.user.name}
        </SmallLabel>
        {children}
      </ResultContainer>
    </Container>
  )
}
