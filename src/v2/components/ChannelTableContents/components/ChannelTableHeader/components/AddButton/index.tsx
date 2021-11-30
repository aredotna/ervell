import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'

import GenericButton from 'v2/components/UI/GenericButton'

const Button = styled(GenericButton).attrs({
  bg: 'gray.light',
})`
  border-radius: 0px;
  height: 100%;
  width: 60px;
  border: 0px solid transparent;
  padding: 0;
  &:hover {
    border: 0px solid transparent !important;
  }
`

const Container = styled(Box)`
  position: relative;
  line-height: 0;
  vertical-align: top;
  height: 100%;
`

const AddFieldContainer = styled(Box)`
  position: absolute;
  background-color: green;
  top: 0;
  right: 60px;
  width: 1000px;
  height: 100%;
  display: flex;
  justify-content: center;
  line-height: 1;
  align-items: center;
`

interface TableAddButtonProps {
  onClick: () => void
}

export const TableAddButton = React.forwardRef<
  HTMLElement,
  TableAddButtonProps
>(({ onClick }, ref) => {
  if (ref) {
  }
  console.log({ ref })
  return (
    <Container>
      <Button onClick={onClick} f={1}>
        Add +
      </Button>

      <AddFieldContainer>hello</AddFieldContainer>
    </Container>
  )
})
