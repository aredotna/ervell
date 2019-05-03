import React from 'react'
import styled from 'styled-components'
import filesize from 'filesize'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Container = styled(Box)`
  width: 100%;
  position: relative;
  overflow: hidden;
`

const Bar = styled(Box).attrs({
  bg: 'gray.semiLight',
})`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateX(-${props => 100 - props.progress}%);
  transition: transform 0.125s;
`

interface Props {
  label: string
  size?: number
  progress: number
}

export const ProgressBar: React.FC<Props> = ({
  label,
  size,
  progress,
  ...rest
}) => {
  return (
    <Container mb={3} py={5} px={6} {...rest}>
      <Bar progress={progress} />

      <Box position="relative">
        <Text textAlign="center" f={2}>
          <strong>{label}</strong> {size && <span>({filesize(size)})</span>}
          {': '}
          {Math.ceil(progress)}%
        </Text>
      </Box>
    </Container>
  )
}
