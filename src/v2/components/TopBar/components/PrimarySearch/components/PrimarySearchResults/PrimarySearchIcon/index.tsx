import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'

import Icons from 'v2/components/UI/Icons'

import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import { PrimarySearchResult } from '__generated__/PrimarySearchResult'

const Container = styled(Box)`
  width: ${ICON_OFFSET};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ChannelIcon = styled(Box)`
  height: 0.75em;
  width: 0.75em;
  border: 1px solid ${props => props.theme.colors.channel[props.visibility]};
`

interface PrimarySearchIconProps {
  result?: PrimarySearchResult
}

export const PrimarySearchIcon: React.FC<PrimarySearchIconProps> = ({
  result,
}) => {
  if (!result) return null

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
  }[result.__typename]

  return (
    <Container>
      <Icons name={name} width="1.5em" height="0.88em" color="gray.base" />
    </Container>
  )
}
