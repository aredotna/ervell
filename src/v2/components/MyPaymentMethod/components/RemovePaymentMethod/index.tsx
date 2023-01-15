import { useMutation } from '@apollo/client'
import React, { useCallback, useState } from 'react'
import {
  RemovePaymentMethod as RemovePayementMethodType,
  RemovePaymentMethodVariables,
} from '__generated__/RemovePaymentMethod'
import removePaymentMethodMutation from './mutations/removePaymentMethodMutation'

interface RemovePaymentMethodProps {
  id: string
  onRemove: () => void
}

export const RemovePaymentMethod: React.FC<RemovePaymentMethodProps> = ({
  id,
  onRemove,
}) => {
  const [mode, setMode] = useState<'resting' | 'removing' | 'error'>('resting')
  const [removePaymentMethod] = useMutation<
    RemovePayementMethodType,
    RemovePaymentMethodVariables
  >(removePaymentMethodMutation)

  const handleClick = useCallback(() => {
    setMode('removing')

    removePaymentMethod({ variables: { id } }).then(() => {
      onRemove()
      setMode('resting')
    })
  }, [removePaymentMethod])

  return (
    <a onClick={handleClick} role="button" tabIndex={0}>
      {
        {
          resting: 'Remove card',
          removing: 'Removing...',
          error: 'Error',
        }[mode]
      }
    </a>
  )
}
