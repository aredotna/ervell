import React, { useState } from 'react'
import styled from 'styled-components'

import dismissBannerMutation from 'v2/components/UI/Banner/mutations/dimissBanner'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Close from 'v2/components/UI/Close'
import Icons from 'v2/components/UI/Icons'
import { useMutation } from '@apollo/client'
import {
  dismissBannerMutation as dismissBannerMutationType,
  dismissBannerMutationVariables,
} from '__generated__/dismissBannerMutation'
import { BannerEnum } from '__generated__/globalTypes'

const Container = styled(Box).attrs({
  p: 6,
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Steps = styled(Text).attrs({
  f: 3,
  mr: 6,
  color: 'utility.semiTranslucent',
})``

const Wrapper = styled(Box).attrs({
  display: 'flex',
  flexDirection: ['column', 'column', 'row'],
  alignItems: 'center',
  justifyContent: 'center',
})``

interface BannerProps {
  banner?: BannerEnum
  onClose?: () => void
  color?: string
  isCloseable?: boolean
  iconName?: string
  steps?: string
}

export const Banner: React.FC<BannerProps & BoxProps> = ({
  banner,
  onClose,
  iconName,
  isCloseable = true,
  color,
  children,
  steps,
  ...rest
}) => {
  const [dismissBanner] = useMutation<
    dismissBannerMutationType,
    dismissBannerMutationVariables
  >(dismissBannerMutation)
  const [mode, setMode] = useState<'resting' | 'closed'>('resting')

  const handleClose = e => {
    e.preventDefault()

    if (banner) {
      dismissBanner({
        variables: { banner },
      })
    }

    if (onClose) onClose()

    setMode('closed')
  }

  if (mode === 'closed') return null

  return (
    <Container {...rest}>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        {iconName && (
          <Icons flexShrink={0} name={iconName} color={color} mr={5} />
        )}

        {steps && <Steps>{steps}</Steps>}

        <Box flex={[1, 1, 'unset']}>
          <Text
            color={color}
            fontWeight="bold"
            textAlign="center"
            underlineLinks
            hoverLinks={{ color: 'gray.bold' }}
          >
            <Wrapper>{children}</Wrapper>
          </Text>
        </Box>
      </Box>

      {isCloseable && (
        <Close size="1.2em" color={color} onClick={handleClose} />
      )}
    </Container>
  )
}

export default Banner
