import React from 'react'
import styled from 'styled-components'

import { EmbeddedChannelContents as EmbeddedChanneContentsData } from '__generated__/EmbeddedChannelContents'

import Box from 'v2/components/UI/Box'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import Cell from 'v2/components/Cell'

const Container = styled(Box).attrs({
  py: 6,
  overflowScrolling: true,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${props => props.theme.constantValues.topBarHeight} 0;
`

const Rail = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: ${props => props.theme.constantValues.blockWidth};
  overflow: hidden;
  font-size: 12px;
`

interface Props {
  channel: EmbeddedChanneContentsData
}

export const EmbeddedChannelContents: React.FC<Props> = ({ channel }) => {
  return (
    <Container>
      <Rail>
        {channel.contents.map(connectable => {
          return (
            <GridItem key={`${connectable.__typename}:${connectable.id}`}>
              <Cell.Konnectable
                key={`${connectable.id}:${connectable.__typename}`}
                konnectable={connectable}
              />
            </GridItem>
          )
        })}
      </Rail>
    </Container>
  )
}
