import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import { BlokkWithQuery } from 'v2/components/Cell/components/Konnectable'
import pathData from './pathData.json'

const Container = styled(Box).attrs({
  pt: 6,
  my: 10,
})`
  display: flex;
  align-items: center;
  justify-content: ${({ length }: { length: number }) =>
    length === 1 ? 'center' : 'space-between'};
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
`

const Block = styled(BlokkWithQuery).attrs({
  width: '225px',
  height: '225px',
})``

const isClientSide = typeof window !== 'undefined'

export const DesireLine: React.FC = () => {
  if (!isClientSide) return null

  const blockIds = pathData.blockIds.sort(() => Math.random() - 0.5).slice(0, 5)

  return (
    <Container>
      {blockIds.map(id => {
        return <Block key={id} id={id} />
      })}
    </Container>
  )
}
