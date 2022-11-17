import React, { useState } from 'react'
import styled from 'styled-components'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'
import constants from 'v2/styles/constants'

const Outer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled(Box).attrs({
  px: 6,
  py: 6,
  borderRadius: '0.5em',
})`
  background-color: ${p => p.theme.colors.gray.input};
  flex-shrink: 0;
  text-align: left;
  flex-basis: 0;
`

const ButtonContainer = styled(Box).attrs({
  mt: 7,
})`
  flex-basis: 400px;
  width: 636px;

  ${constants.media.small`
    width: 100%;
  `}
`

const HeaderContainer = styled(Box).attrs({
  mb: 5,
})`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Button = styled(GenericButton).attrs({
  mb: 4,
})`
  flex-shrink: 0;
  flex-basis: auto;
  white-space: nowrap;
`

interface CancelPremiumProps {
  onCancel: () => void
}

export const CancelPremium: React.FC<CancelPremiumProps & BoxProps> = ({
  onCancel,
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'active' | 'cancelling'>(
    'resting'
  )

  const activateConfirmation = e => {
    e.preventDefault()
    setMode('active')
  }

  const cancelCancellation = e => {
    e.preventDefault()
    setMode('resting')
  }

  return (
    <Box {...rest}>
      {mode === 'resting' && (
        <Text f={2} underlineLinks>
          <a onClick={activateConfirmation} role="button" tabIndex={0}>
            Cancel premium
          </a>
        </Text>
      )}

      {mode !== 'resting' && (
        <Outer>
          <Container>
            <HeaderContainer>
              <Icons name="Info" size="0.75rem" color="gray.regular" mr={4} />
              <Text f={2} mb={4} fontWeight="bold">
                Are you sure?
              </Text>
            </HeaderContainer>
            <Text f={2} mb={4} boldLinks>
              If you&apos;re cancelling your Premium membership, you&apos;ll
              lose access to all of your premium features and won&apos;t be able
              to add any more blocks. <strong>Note:</strong> If you&apos;re
              cancelling for financial reasons, please{' '}
              <a href="mailto:help@are.na?subject=Premium account financial assistance">
                contact us
              </a>{' '}
              and we&apos;ll work with you.
            </Text>
            <ButtonContainer>
              <Button
                f={2}
                onClick={onCancel}
                disabled={mode === 'cancelling'}
                mr={4}
              >
                {
                  {
                    active: 'Yes, please cancel my Premium membership',
                    cancelling: 'Cancelling...',
                    error: 'Error',
                    refreshing: 'Wait',
                  }[mode]
                }
              </Button>{' '}
              {mode !== 'cancelling' && (
                <Button
                  f={2}
                  borderColor="state.premium"
                  color="state.premium"
                  onClick={cancelCancellation}
                >
                  Nevermind, I&apos;ll keep my Premium membership!
                </Button>
              )}
            </ButtonContainer>
          </Container>
        </Outer>
      )}
    </Box>
  )
}

export default CancelPremium
