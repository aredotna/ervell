import React, { useCallback } from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import GroupBadge from 'v2/components/UI/GroupBadge'
import BorderedLock from 'v2/components/UI/BorderedLock'

import { overflowEllipsis } from 'v2/styles/mixins'
import { BoxProps, mixin as boxMixin } from 'v2/components/UI/Box'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { AdaptibleLink } from 'v2/components/UI/AdaptibleLink'
import { AdvancedSearchIcon } from '../AdvancedSearchIcon'
import { AdvancedSearchCount } from '../AdvancedSearchCount'
import AdvancedSearchReturnLabel from 'v2/components/TopBar/components/AdvancedPrimarySearch/components/AdvancedSearchReturnLabel'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'
import { AdvancedSearchResultBlock } from '../AdvancedSearchResultBlock'
import constants from 'v2/styles/constants'

const Label = styled(Text).attrs({
  f: [1, 2, 3],
})`
  font-weight: bold;
  // Push out to accomodate "overflowing" badge border
  padding-right: 1px;
  ${overflowEllipsis}
`

const Container = styled(AdaptibleLink)<{ hideHover?: boolean }>`
  ${boxMixin}
  display: flex;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;

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

  ${constants.media.small`
    flex-direction: column;
    align-items: flex-start;
  `}
`

const PathContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    &:after {
      content: '/';
      margin: 0 ${props => props.theme.constantValues.emptySpaceWidth};
      font-family: ${props => props.theme.fonts.mono};
      opacity: 0.5;
    }

    &:last-child:after {
      content: '';
      margin: 0;
    }
  }
`

Container.defaultProps = {
  pr: 6,
  py: 6,
  bg: 'gray.light',
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
}

interface AdvancedSearchResultProps {
  result?: AdvancedQuickSearchResult
  selected?: boolean
  to?: string
  bg?: any
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    result?: AdvancedQuickSearchResult
  ) => void
}

export const AdvancedSearchResult: React.FC<AdvancedSearchResultProps &
  BoxProps> = ({ result, children, selected = false, onClick, ...rest }) => {
  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (onClick) {
        onClick(e, result)
      }
    },
    [onClick, result]
  )

  if (result && result.href) {
    if (result.__typename == 'PendingBlock') {
      return null
    }

    if (
      result.__typename === 'Attachment' ||
      result.__typename === 'Embed' ||
      result.__typename === 'Image' ||
      result.__typename === 'Link' ||
      result.__typename === 'Text'
    ) {
      return (
        <AdvancedSearchResultBlock
          selected={selected}
          result={result}
          onClick={onClick}
        />
      )
    }

    return (
      <Container
        href={result.href}
        onClick={handleOnClick}
        to={result.href}
        state={getBreadcrumbPath(result)}
        selected={selected}
        {...rest}
      >
        <AdvancedSearchIcon result={result} />
        <ResultContainer>
          <PathContainer>
            {result.__typename === 'Channel' && result.owner && (
              <Label flex="1">
                {result.owner.name}

                {result.owner.__typename === 'Group' && (
                  <GroupBadge f={0} visibility={result.owner.visibility} />
                )}
              </Label>
            )}

            <Label
              color={
                result.__typename === 'Channel' && result.visibility
                  ? `channel.${result.visibility}`
                  : 'gray.base'
              }
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: result.label,
                }}
              />

              {(result.__typename === 'Channel' ||
                result.__typename === 'Group') &&
                result.visibility === 'private' && <BorderedLock ml={3} />}

              {result.__typename === 'Group' && (
                <GroupBadge f={0} visibility={result.visibility} />
              )}
            </Label>
          </PathContainer>

          {!selected && <AdvancedSearchCount result={result} />}
          {selected && result.href && (
            <AdvancedSearchReturnLabel url={result.href} label={'Enter'} />
          )}
        </ResultContainer>
      </Container>
    )
  }

  return (
    <Container onClick={onClick} selected={selected} {...rest}>
      {children}
    </Container>
  )
}

export default AdvancedSearchResult
