import React from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import { CanUserConnect as CanUserConnectData } from '__generated__/CanUserConnect'

import canUserConnectQuery from 'v2/components/Bookmarklet/components/Blocks/components/ConnectCTA/queries/canConnect'

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

export const ConnectCTA: React.FC = () => {
  return (
    <Query<CanUserConnectData> query={canUserConnectQuery}>
      {({ data, loading, error }) => {
        if (loading || error || !data) return null

        const {
          me: { is_exceeding_either_connections_limit },
        } = data

        return is_exceeding_either_connections_limit ? (
          <Overlay>
            <Text f={5} color="gray.medium" textAlign="center">
              You’ve reached your limit of free blocks
            </Text>

            <Button href="https://www.are.na/settings/billing" target="_blank">
              Register for Premium
            </Button>
          </Overlay>
        ) : null
      }}
    </Query>
  )
}
