import React from 'react'
import styled from 'styled-components'
import { ResultBlock } from 'v2/components/TopBar/components/AdvancedPrimarySearch/components/AdvancedSearchResultBlock'
import Box from 'v2/components/UI/Box'

import Icons from 'v2/components/UI/Icons'

import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import { PrimarySearchResult } from '__generated__/PrimarySearchResult'

const Container = styled(Box)`
  width: ${ICON_OFFSET};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
  }
`

const ChannelIcon = styled(Box)`
  height: 0.75em;
  width: 0.75em;
  border: 1px solid ${props => props.theme.colors.channel[props.visibility]};
`

interface AdvancedSearchIconProps {
  result?: PrimarySearchResult | ResultBlock
}

export const AdvancedSearchIcon: React.FC<AdvancedSearchIconProps> = ({
  result,
}) => {
  if (!result || !result.__typename) return null

  if (
    result.__typename === 'Link' ||
    result.__typename === 'Image' ||
    result.__typename === 'Attachment' ||
    result.__typename === 'Embed'
  ) {
    return (
      <Container>
        <img src={result.src} />
      </Container>
    )
  }

  if (result.__typename === 'Channel') {
    return (
      <Container>
        <ChannelIcon visibility={result.visibility} />
      </Container>
    )
  }

  const name = {
    Channel: 'Channel',
    User: 'Profile',
    Group: 'Group',
    Text: 'Text',
  }[result.__typename]

  return (
    <Container>
      <Icons name={name} width="1.5em" height="0.88em" color="gray.medium" />
    </Container>
  )
}
