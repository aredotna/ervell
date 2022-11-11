import React, { useState } from 'react'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'

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
        <div>
          <Text f={2} mb={4} color="state.alert" fontWeight="bold">
            Are you sure?
          </Text>
          <Text f={2} mb={4} color="state.alert">
            If you're cancelling your Premium membership, you'll lose access to
            all of your premium features and won't be able to add any more
            blocks.
          </Text>
          <Text f={2} mb={4} color="state.alert" boldLinks>
            <strong>Note:</strong> If you're cancelling for financial reasons,
            please <a href="mailto:help@are.na">contact us</a> and we'll work
            with you.
          </Text>
          <GenericButton
            f={2}
            color="state.alert"
            onClick={onCancel}
            disabled={mode === 'cancelling'}
          >
            {
              {
                active: 'Yes, please cancel my Premium membership',
                cancelling: 'Cancelling...',
                error: 'Error',
                refreshing: 'Wait',
              }[mode]
            }
          </GenericButton>{' '}
          {mode !== 'cancelling' && (
            <GenericButton
              f={2}
              bg="state.premium"
              color="white"
              onClick={cancelCancellation}
            >
              Nevermind, I'll keep my Premium membership!
            </GenericButton>
          )}
        </div>
      )}
    </Box>
  )
}

export default CancelPremium
