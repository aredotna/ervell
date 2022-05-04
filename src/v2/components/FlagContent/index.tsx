import React, { useCallback } from 'react'

import Modal from 'v2/components/UI/Modal'
import { FlagContentModal } from './components/FlagContentModal'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

interface FlagContentProps {
  id: string
  type: BaseConnectableTypeEnum
  label?: string
}

export const FlagContent: React.FC<FlagContentProps> = ({
  id,
  type,
  label = 'Flag',
  ...rest
}) => {
  const openFlagModal = useCallback(() => {
    const modal = new Modal(
      FlagContentModal,
      {
        id,
        type,
        onDone: () => {
          modal.close()
        },
      },
      { height: 'auto', width: '30em' }
    )
    modal.open()
  }, [])

  return (
    <span onClick={openFlagModal} role="button" {...rest}>
      {label}
    </span>
  )
}
