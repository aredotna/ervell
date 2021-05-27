import React from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import { CanConnectChannelQuery as CanConnectChannelQueryData } from '__generated__/CanConnectChannelQuery'
import { CanConnectBlockQuery as CanConnectBlockQueryData } from '__generated__/CanConnectBlockQuery'

type CanConnectQueryData = CanConnectChannelQueryData | CanConnectBlockQueryData

import {
  canConnectChannelQuery,
  canConnectBlockQuery,
} from './queries/canConnect'

import { Box } from 'v2/components/UI/Box'
import { Text } from 'v2/components/UI/Text'
import { FilledButton } from 'v2/components/UI/Buttons'

const Button = styled(FilledButton).attrs({
  py: 6,
  f: 4,
  color: 'utility.transparent',
})`
  &:hover {
    background-color: transparent;
  }
`

const Overlay = styled(Box).attrs({
  // Overlays `outlineBorder` in some contexts
  mx: '-5px',
  mb: '-5px',
  px: 6,
  pb: 4,
  pt: 9,
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
`

interface Props {
  id: string | number
  type: 'BLOCK' | 'CHANNEL'
}

export const ConnectCTA: React.FC<Props> | null = ({ id, type }) => {
  const query = {
    CHANNEL: canConnectChannelQuery,
    BLOCK: canConnectBlockQuery,
  }[type]

  return (
    <Query<CanConnectQueryData> query={query} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading || error) return null

        const {
          connectable: { can },
        } = data

        return can.connect ? null : (
          <Overlay>
            <Text f={5} color="gray.medium" textAlign="center">
              You’ve reached your limit of free blocks
            </Text>

            <Button href="/settings/billing" target="_blank">
              Register for Premium
            </Button>
          </Overlay>
        )
      }}
    </Query>
  )
}
