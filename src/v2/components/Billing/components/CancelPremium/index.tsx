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
          <Text f={2} mb={4} color="state.alert">
            If you're cancelling your premium membership, you'll lose access to
            all of your premium features. Are you sure you want to cancel?
          </Text>
          <GenericButton
            f={2}
            color="state.alert"
            onClick={onCancel}
            disabled={mode === 'cancelling'}
          >
            {
              {
                active: 'Yes, cancel Premium',
                cancelling: 'Cancelling...',
                error: 'Error',
                refreshing: 'Wait',
              }[mode]
            }
          </GenericButton>{' '}
          {mode !== 'cancelling' && (
            <GenericButton
              f={2}
              color="state.alert"
              onClick={cancelCancellation}
            >
              No
            </GenericButton>
          )}
        </div>
      )}
    </Box>
  )
}

export default CancelPremium
